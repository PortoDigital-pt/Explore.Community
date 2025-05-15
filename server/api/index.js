import {
  poiListSchema,
  eventListSchema,
  detailSchema,
  touristTripsListSchema
} from './validation';
import { getTouristTripsList } from './handlers/tourist-trips';
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
  '/api/tourist-trips': {
    handler: getTouristTripsList,
    schema: touristTripsListSchema
  }
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
