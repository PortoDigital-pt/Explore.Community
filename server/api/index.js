import { poiToDto, eventToDto } from './dto';
import { getDate, getDateInFutureDays } from './date';

const defaultQueryParams = {
  options: 'count',
  georel: 'near;maxDistance:25000',
  geometry: 'point',
  orderBy: 'geo:distance',
  limit: '10',
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
          ? `category_lang.pt==${mappedCategories.join(',')}${
              dataProvider ? `;dataProvider==${dataProvider.pois}` : ''
            }`
          : `category==${mappedCategories};endDate>='${getDate()}';startDate<='${getDateInFutureDays(
              7
            )}'`;
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

const getPoiDetail = async (
  { params: { id }, query: { language } },
  response
) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}/${id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(poiToDto(data, language));
};

const getPoiList = async (
  {
    query: { language, ...queryRest },
    config: {
      filters,
      ngsi: { dataProvider },
      defaultEndpoint: { lat, lon }
    }
  },
  response
) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}?${buildNGSIQueryString({
      filters,
      dataProvider,
      coords: `${lat},${lon}`,
      ...defaultPoiQueryParams,
      ...queryRest
    })}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(data.map(poi => poiToDto(poi, language)));
};

const getEventDetail = async (
  { params: { id }, query: { language } },
  response
) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}/${id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(eventToDto(data, language));
};

const getEventList = async (
  {
    query: { language, ...queryRest },
    config: {
      filters,
      ngsi: { dataProvider },
      defaultEndpoint: { lat, lon }
    }
  },
  response
) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}?${buildNGSIQueryString({
      filters,
      dataProvider,
      coords: `${lat},${lon}`,
      ...defaultEventQueryParams,
      ...queryRest
    })}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response
    .status(status)
    .json(data.map(event => eventToDto(event, language)));
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

export const setupApiRoutes = (app, { filters, ngsi, defaultEndpoint }) =>
  Object.entries(routes).forEach(([route, handler]) =>
    app.get(
      route,
      setupCache,
      (request, response, next) =>
        decorateRequest(request, response, next, {
          filters,
          ngsi,
          defaultEndpoint
        }),
      handler
    )
  );
