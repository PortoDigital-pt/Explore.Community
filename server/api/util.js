import { getDate, getDateInFutureDays } from './date';

export const defaultQueryParams = {
  georel: 'near;maxDistance:25000',
  geometry: 'point',
  options: 'count',
  orderBy: 'geo:distance',
  limit: '10',
  offset: '0',
  attrs: 'dateCreated,dateModified,*'
};

export const defaultPoiQueryParams = {
  ...defaultQueryParams,
  type: 'PointOfInterest'
};

export const defaultEventQueryParams = {
  ...defaultQueryParams,
  type: 'Event'
};

export const defaultRoutesQueryParams = {
  ...defaultQueryParams,
  type: 'TouristTrip'
};

export const defaultBlocksQueryParams = {
  ...defaultQueryParams,
  type: 'PointOfInterestGroup'
};

export const setupCache = (request, response, next) => {
  // setting cache to 1 hour
  response.set('Cache-Control', 'max-age=0, public');
  // todo - uncomment response.set('Cache-Control', 'max-age=3600, public');
  next();
};

export const decorateRequest = (request, response, next, config) => {
  request.config = config;
  next();
};

const MAP_LAYER_TYPE = {
  PointOfInterest: 'pois',
  Event: 'events'
};

export const buildNGSIQueryString = ({ filters, dataProvider, ...data }) => {
  const query = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (key === 'categories' && !!MAP_LAYER_TYPE[data.type]) {
      const mappedCategories = value.map(
        categoryKey => `'${filters[MAP_LAYER_TYPE[data.type]][categoryKey].pt}'`
      );

      const categoriesQueryValue =
        data.type === 'PointOfInterest'
          ? `category_lang.pt==${mappedCategories.join(',')}${
              dataProvider?.pois ? `;dataProvider==${dataProvider.pois}` : ''
            }`
          : `section_lang.pt==${mappedCategories.join(',')}${
              dataProvider?.events
                ? `;dataProvider==${dataProvider.events}`
                : ''
            };endDate>='${getDate()}';startDate<='${getDateInFutureDays(7)}'`;
      query.set('q', categoriesQueryValue);
      return;
    }
    
    if (key === 'block') {
      query.set('q', `districtGroups=='${value}'`);
      return;
    }

    query.set(key, value.toString());
  });

  return query.toString();
};

/**
 * Get the total count from response headers
 *
 * @param {Headers} headers the response headers
 */
const getTotal = headers => headers.get('fiware-total-count');

export const customFetch = async (url, paginated = false) => {
  const response = await fetch(url);
  const preparedResponse = {
    status: response.status,
    text: response.statusText
  };

  if (response.status !== 200) {
    return preparedResponse;
  }

  const data = await response.json();

  if (paginated) {
    return { data, total: getTotal(response.headers), ...preparedResponse };
  }

  return { data, ...preparedResponse };
};
