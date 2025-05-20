import {
  poiListSchema,
  eventListSchema,
  detailSchema,
  routesListSchema,
} from './validation';
import { getRoutesDetail, getRoutesList } from './handlers/routes';
import { getPoiDetail, getPoiList } from './handlers/pois';
import { getEventDetail, getEventList } from './handlers/events';
import { setupCache } from './util';

const decorateRequest = (request, response, next, config) => {
  request.config = config;
  next();
};

const routes = {
  '/api/pois/:id': { handler: getPoiDetail, schema: detailSchema },
  '/api/pois': { handler: getPoiList, schema: poiListSchema },
  '/api/events/:id': { handler: getEventDetail, schema: detailSchema },
  '/api/events': { handler: getEventList, schema: eventListSchema },
  '/api/routes': {
    handler: getRoutesList,
    schema: routesListSchema
  },
  '/api/routes/:id': { handler: getRoutesDetail, schema: detailSchema }
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
          defaultEndpoint,
        }),
      schema,
      handler
    )
  );
