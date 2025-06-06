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

export function getBlockList(query, { signal }) {
  const auxQuery = { ...query };
  delete auxQuery.categories;

  return retryFetch(`/api/blocks${buildQueryString(auxQuery)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getBlockById({ id, query }, { signal }) {
  return retryFetch(`/api/blocks/${id}${buildQueryString(query)}`, 2, 200, {
    signal
  }).then(response => response.json());
}

export function getSmooveById(id, { signal }) {
  return retryFetch(`/api/smoove/${id}`, 2, 200, {
    signal
  }).then(response => response.json());
}
