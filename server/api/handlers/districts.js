import { getDetail, getList } from '.';
import { districtToDto } from '../dto';
import { defaultDistrictsQueryParams } from '../util';

export const getDistrictList = (request, response) =>
  getList(districtToDto, defaultDistrictsQueryParams, request, response);

export const getDistrictDetail = (request, response) =>
  getDetail(districtToDto, request, response);
