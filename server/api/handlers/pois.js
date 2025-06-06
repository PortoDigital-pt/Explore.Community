import { getDetail, getList } from '.';
import { poiToDto } from '../dto';
import { defaultPoiQueryParams } from '../util';

export const getPoiDetail = (request, response) =>
  getDetail(poiToDto, request, response);
export const getPoiList = (request, response) =>
  getList(poiToDto, defaultPoiQueryParams, request, response);
