import { getDetail, getList } from '.';
import { eventToDto } from '../dto';
import { defaultEventQueryParams } from '../util';

export const getEventDetail = (request, response) =>
  getDetail(eventToDto, request, response);

export const getEventList = (request, response) =>
  getList(eventToDto, defaultEventQueryParams, request, response);
