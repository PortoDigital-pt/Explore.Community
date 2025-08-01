import {
  poiListSchema,
  eventListSchema,
  detailSchema,
  routesListSchema,
  districtsListSchema,
  weatherSchema
} from './validation';
import { getRoutesDetail, getRoutesList } from './handlers/routes';
import { getDistrictDetail, getDistrictList } from './handlers/districts';
import { getPoiDetail, getPoiList } from './handlers/pois';
import { getEventDetail, getEventList } from './handlers/events';
import { setupCache, decorateRequest } from './util';
import { getWeather } from './handlers/weather';

const cachedRoutes = {
  '/api/pois/:id': { handler: getPoiDetail, schema: detailSchema },
  '/api/pois': { handler: getPoiList, schema: poiListSchema },
  '/api/events/:id': { handler: getEventDetail, schema: detailSchema },
  '/api/events': { handler: getEventList, schema: eventListSchema },
  '/api/routes': { handler: getRoutesList, schema: routesListSchema },
  '/api/routes/:id': { handler: getRoutesDetail, schema: detailSchema },
  '/api/districts': { handler: getDistrictList, schema: districtsListSchema },
  '/api/districts/:id': { handler: getDistrictDetail, schema: detailSchema }
};

const routes = {
  '/api/weather': { handler: getWeather, schema: weatherSchema }
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
    app.get(
      route,
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
};
