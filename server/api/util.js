import { getDate, getDateInFutureDays } from './date';

export const defaultQueryParams = {
  georel: 'near;maxDistance:25000',
  geometry: 'point',
  options: 'count',
  orderBy: 'geo:distance',
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

const getMapLayerByType = type => {
  switch (type) {
    case 'TouristTrip':
      return 'routes';
    case 'PointOfInterest':
      return 'pois';
    default:
      return 'events';
  }
};

export const buildNGSIQueryString = ({ filters, dataProvider, ...data }) => {
  const query = new URLSearchParams();

  const arrQuery = [];
  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (key === 'categories') {
      const mappedCategories = value?.map(
        categoryKey =>
          `'${filters[getMapLayerByType(data.type)][categoryKey].pt}'`
      );

      if (data.type === 'Event') {
        arrQuery.push(`section_lang.pt==${mappedCategories.join(',')}`);

        if (dataProvider?.events) {
          arrQuery.push(`dataProvider==${dataProvider.events}`);
        }

        arrQuery.push(`endDate>='${getDate()}'`);
        arrQuery.push(`startDate<='${getDateInFutureDays(7)}'`);
      } else {
        arrQuery.push(`category_lang.pt==${mappedCategories.join(',')}`);

        if (data.type === 'PointOfInterest' && dataProvider?.pois) {
          arrQuery.push(`dataProvider==${dataProvider.pois}`);
        }
      }

      return;
    }

    if (key === 'difficulties') {
      if (value) {
        const mappeddiculties = value.map(
          dificultyKey =>
            `'${filters[getMapLayerByType(data.type)][
              dificultyKey
            ].en.toLowerCase()}'`
        );

        arrQuery.push(`difficulty==${mappeddiculties.join(',')}`);
      }
      return;
    }

    if (key === 'durationRanges') {
      if (value) {
        const mappedDurationRanges = value.map(
          durationRangeKey =>
            `'${filters[getMapLayerByType(data.type)][durationRangeKey].pt}'`
        );

        arrQuery.push(`durationRange==${mappedDurationRanges.join(',')}`);
      }

      return;
    }

    if (key === 'block') {
      arrQuery.push(`districtGroups=='${value}'`);
      return;
    }

    query.set(key, value.toString());
  });

  arrQuery.length > 0 && query.set('q', arrQuery.join(';'));

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
