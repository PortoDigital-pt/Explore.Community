import { getDetail, getList } from '.';
import { routesToDto } from '../dto';
import { defaultTouristTripsQueryParams } from '../util';

export const getRoutesList = (request, response) =>
  getList(routesToDto, defaultTouristTripsQueryParams, request, response);

export const getRoutesDetail = (request, response) =>
  getDetail(routesToDto, request, response);
