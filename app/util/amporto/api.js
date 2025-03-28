import { retryFetch } from '../fetchUtils';
import { buildQueryString } from './query';

export function getPoiById(id) {
  return retryFetch(`/api/pois/${id}`, 2, 200).then(response =>
    response.json()
  );
}

export function getEventById(id) {
  return retryFetch(`/api/events/${id}`, 2, 200).then(response =>
    response.json()
  );
}

export function getPoiList(query) {
  return retryFetch(`/api/pois${buildQueryString(query)}`, 2, 200).then(
    response => response.json()
  );
}

export function getEventList(query = {}) {
  return retryFetch(`/api/events${buildQueryString(query)}`, 2, 200).then(
    response => response.json()
  );
}
