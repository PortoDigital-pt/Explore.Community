import {
  poiListSchema,
  eventListSchema,
  detailSchema,
  routesListSchema,
  idSchema
} from './validation';
import { getRoutesDetail, getRoutesList } from './handlers/routes';
import { getPoiDetail, getPoiList } from './handlers/pois';
import { getEventDetail, getEventList } from './handlers/events';
import { setupCache } from './util';
import { getSmooveDetail } from './handlers/smoove';

const decorateRequest = (request, response, next, config) => {
  request.config = config;
  next();
};

const cachedRoutes = {
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

const routes = {
  '/api/smoove/:id': { handler: getSmooveDetail, schema: idSchema }
};

export const setupApiRoutes = (app, { filters, ngsi, defaultEndpoint }) => {
  Object.entries(cachedRoutes).forEach(([route, { handler, schema }]) =>
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

  Object.entries(routes).forEach(([route, { handler, schema }]) =>
    app.get(route, schema, handler)
  );
};
