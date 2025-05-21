import { getDetail, getList } from '.';
import { routesToDto } from '../dto';
import { defaultTouristTripsQueryParams } from '../util';
// import { getDetail, getList } from './routes.mock';

// todo - revert it when the NGSI data is available
export const getRoutesList = (request, response) =>
  // getList(request, response);
  getList(routesToDto, defaultTouristTripsQueryParams, request, response);

export const getRoutesDetail = (request, response) =>
  getDetail(routesToDto, request, response);
// getDetail(request, response);
