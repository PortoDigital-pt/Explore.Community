import { getDetail, getList } from '.';
import { routesToDto } from '../dto';
import { defaultRoutesQueryParams } from '../util';

export const getRoutesList = (request, response) =>
  getList(routesToDto, defaultRoutesQueryParams, request, response);

export const getRoutesDetail = (request, response) =>
  getDetail(routesToDto, request, response);
