import { validationResult } from 'express-validator';
import { poiToDto, eventToDto } from './dto';
import { getDate, getDateInFutureDays } from './date';
import { getOffset, getInfinitePagination } from './pagination';
import { poiListSchema, eventListSchema, detailSchema } from './validation';

const defaultQueryParams = {
  georel: 'near;maxDistance:25000',
  geometry: 'point',
  options: 'count',
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
      const mappedCategories = value.map(
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

const customFetch = async (url, paginated = false) => {
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

const getDetail = async (toDto, request, response) => {
  const validation = validationResult(request);

  if (!validation.isEmpty()) {
    const [{ msg }] = validation.array();

    return response.status(400).send(msg);
  }

  const {
    params: { id },
    query: { language }
  } = request;

  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}/${id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(toDto(data, language));
};

const getList = async (toDto, defaultQueryParams, request, response) => {
  const validation = validationResult(request);

  if (!validation.isEmpty()) {
    const [{ msg }] = validation.array();

    return response.status(400).send(msg);
  }

  const {
    query: { language, page, ...queryRest },
    config: {
      filters,
      ngsi: { dataProvider },
      defaultEndpoint: { lat, lon }
    }
  } = request;

  const paginated = page !== undefined;

  if (paginated) {
    // eslint-disable-next-line no-param-reassign
    defaultQueryParams.offset = getOffset({
      limit: defaultQueryParams.limit,
      page
    });
  }

  const { data, total, status, text } = await customFetch(
    `${process.env.NGSI_URL}?${buildNGSIQueryString({
      filters,
      dataProvider,
      coords: `${lat},${lon}`,
      ...defaultQueryParams,
      ...queryRest
    })}`,
    paginated
  );

  if (!data) {
    return response.status(status).send(text);
  }

  let pagination = null;

  if (paginated) {
    pagination = getInfinitePagination({
      total,
      page,
      limit: defaultQueryParams.limit
    });
  }

  return response.status(status).json({
    data: data.map(item => toDto(item, language)),
    pagination
  });
};

const getPoiDetail = (request, response) =>
  getDetail(poiToDto, request, response);

const getEventDetail = (request, response) =>
  getDetail(eventToDto, request, response);

const getPoiList = (request, response) =>
  getList(poiToDto, defaultPoiQueryParams, request, response);

const getEventList = (request, response) =>
  getList(eventToDto, defaultEventQueryParams, request, response);

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
  '/api/pois/:id': { handler: getPoiDetail, schema: detailSchema },
  '/api/pois': { handler: getPoiList, schema: poiListSchema },
  '/api/events/:id': { handler: getEventDetail, schema: detailSchema },
  '/api/events': { handler: getEventList, schema: eventListSchema }
};

export const setupApiRoutes = (app, { filters, ngsi, defaultEndpoint }) =>
  Object.entries(routes).forEach(([route, { handler, schema }]) =>
    app.get(
      route,
      setupCache,
      (request, response, next) =>
        decorateRequest(request, response, next, {
          filters,
          ngsi,
          defaultEndpoint
        }),
      schema,
      handler
    )
  );
