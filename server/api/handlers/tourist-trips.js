import { getList } from '.';
import { touristTripToDto } from '../dto';
import { defaultTouristTripsQueryParams } from '../util';

export const getTouristTripsList = (request, response) =>
  getList(touristTripToDto, defaultTouristTripsQueryParams, request, response);
