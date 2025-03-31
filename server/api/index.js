import { poiToDto, eventToDto } from './dto';
import { getDate, getDateInFutureDays } from './date';

const defaultQueryParams = {
  options: 'count',
  georel: 'near;maxDistance:25000',
  geometry: 'point',
  orderBy: 'geo:distance',
  limit: '20',
  offset: '0',
  attrs: 'dateCreated,dateModified,*'
};
const defaultPoiQueryParams = {
  ...defaultQueryParams,
  type: 'PointOfInterest'
};
const defaultEventQueryParams = {
  ...defaultQueryParams,
  type: 'Event'
};

const buildNGSIQueryString = ({ filters, dataProvider, ...data }) => {
  const query = new URLSearchParams();

  // if data does not contain categories query, we force filtering for only the valid ones,
  // which it is the same as if the user has all selected. Needed to always show cards of valid categories
  // eslint-disable-next-line no-param-reassign
  data.categories =
    data.categories ??
    Object.keys(
      filters[data.type === 'PointOfInterest' ? 'pois' : 'events']
    ).toString();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }

    if (key === 'categories') {
      const mappedCategories = value
        .split(',')
        .map(
          categoryKey =>
            `'${
              filters[data.type === 'PointOfInterest' ? 'pois' : 'events'][
                categoryKey
              ].pt
            }'`
        );
      const categoriesQueryValue =
        data.type === 'PointOfInterest'
          ? `category_lang.pt==${mappedCategories}${
              dataProvider ? `;dataProvider~=${dataProvider}` : ''
            }`
          : `category==${mappedCategories};endDate>=${getDate()};startDate<=${getDateInFutureDays(
              7
            )}`;
      query.set('q', categoriesQueryValue);
      return;
    }

    query.set(key, value.toString());
  });

  return query.toString();
};

const customFetch = async url => {
  const response = await fetch(url);
  const preparedResponse = {
    status: response.status,
    text: response.statusText
  };

  if (response.status !== 200) {
    return preparedResponse;
  }

  const data = await response.json();

  return { data, ...preparedResponse };
};

const getPoiDetail = async ({ params: { id } }, response) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}/${id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(poiToDto(data));
};

const getPoiList = async (
  {
    query,
    config: {
      filters,
      ngsi: { dataProvider, coords }
    }
  },
  response
) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}?${buildNGSIQueryString({
      filters,
      dataProvider,
      coords,
      ...defaultPoiQueryParams,
      ...query
    })}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(data.map(poiToDto));
};

const getEventDetail = async ({ params: { id } }, response) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}/${id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(eventToDto(data));
};

const getEventList = async (
  {
    query,
    config: {
      filters,
      ngsi: { dataProvider, coords }
    }
  },
  response
) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}?${buildNGSIQueryString({
      filters,
      dataProvider,
      coords,
      ...defaultEventQueryParams,
      ...query
    })}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(data.map(eventToDto));
};

const setupCache = (request, response, next) => {
  // setting cache to 1 hour
  response.set('Cache-Control', 'max-age=3600, public');
  next();
};

const decorateRequest = (request, response, next, config) => {
  request.config = config;
  next();
};

const routes = {
  '/api/pois/:id': getPoiDetail,
  '/api/pois': getPoiList,
  '/api/events/:id': getEventDetail,
  '/api/events': getEventList
};

export const setupApiRoutes = (app, { filters, ngsi }) =>
  Object.entries(routes).forEach(([route, handler]) =>
    app.get(
      route,
      setupCache,
      (request, response, next) =>
        decorateRequest(request, response, next, { filters, ngsi }),
      handler
    )
  );
