import { retryFetch } from '../fetchUtils';
import { buildQueryString } from './query';

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

export function getTouristTripList(query, { signal }) {
  const auxQuery = { ...query };
  delete auxQuery.categories;

  return retryFetch(`/api/tourist-trips${buildQueryString(auxQuery)}`, 2, 200, {
    signal
  }).then(response => response.json());
}
