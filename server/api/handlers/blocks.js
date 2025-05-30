import { getDetail, getList } from '.';
import { blockToDto } from '../dto';
import { defaultBlocksQueryParams } from '../util';

export const getBlockList = (request, response) =>
  getList(blockToDto, defaultBlocksQueryParams, request, response);

export const getBlockDetail = (request, response) =>
  getDetail(blockToDto, request, response);
