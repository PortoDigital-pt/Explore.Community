import { shape, string, arrayOf, oneOfType, number } from 'prop-types';

export const blockShape = shape({
  type: string.isRequired,
  id: string.isRequired,
  category: oneOfType([string, arrayOf(string)]).isRequired,
  description: string,
  lon: number.isRequired,
  lat: number.isRequired,
  name: string.isRequired,
  images: arrayOf(string),
  pois: arrayOf(string),
  events: arrayOf(string),
  routes: arrayOf(string)
});
