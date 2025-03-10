import { poiToDto, eventToDto } from './dto';

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

const getEventDetail = async ({ params: { id } }, response) => {
  const { data, status, text } = await customFetch(
    `${process.env.NGSI_URL}/${id}`
  );

  if (!data) {
    return response.status(status).send(text);
  }

  return response.status(status).json(eventToDto(data));
};

const setupCache = (request, response, next) => {
  // setting cache to 1 hour
  response.set('Cache-Control', 'max-age=3600, public');
  next();
};

const routes = {
  '/api/pois/:id': getPoiDetail,
  '/api/events/:id': getEventDetail
};

export const setupApiRoutes = app =>
  Object.entries(routes).forEach(([route, handler]) =>
    app.get(route, setupCache, handler)
  );
