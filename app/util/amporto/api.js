import { retryFetch } from '../fetchUtils';
import { buildQueryString } from './query';

export function getPoiById({ id, query }) {
  return retryFetch(`/api/pois/${id}${buildQueryString(query)}`, 2, 200).then(
    response => response.json()
  );
}

export function getEventById({ id, query }) {
  return retryFetch(`/api/events/${id}${buildQueryString(query)}`, 2, 200).then(
    response => response.json()
  );
}

export function getPoiList(query) {
  return retryFetch(`/api/pois${buildQueryString(query)}`, 2, 200).then(
    response => response.json()
  );
}

export function getEventList(query) {
  return retryFetch(`/api/events${buildQueryString(query)}`, 2, 200).then(
    response => response.json()
  );
}
