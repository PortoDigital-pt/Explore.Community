import { retryFetch } from '../fetchUtils';
import { buildDataForRoutes, buildQueryString } from './query';

export function getPoiById({ id, query }, { signal }) {
  return retryFetch(`/api/pois/${id}${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getEventById({ id, query }, { signal }) {
  return retryFetch(`/api/events/${id}${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getPoiList(query, { signal }) {
  return retryFetch(`/api/pois${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getEventList(query, { signal }) {
  return retryFetch(`/api/events${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getRoutesList(query, { signal }) {
  return retryFetch(`/api/routes${buildDataForRoutes(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getRoutesById({ id, query }, { signal }) {
  return retryFetch(`/api/routes/${id}${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getDistrictList(query, { signal }) {
  const auxQuery = { ...query };
  delete auxQuery.categories;

  return retryFetch(`/api/districts${buildQueryString(auxQuery)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getDistrictById({ id, query }, { signal }) {
  return retryFetch(`/api/districts/${id}${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getWeather(query, { signal }) {
  return retryFetch(`/api/weather${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}
