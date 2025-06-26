import { string, shape, oneOfType, arrayOf, number } from 'prop-types';

export const eventShape = shape({
  type: string.isRequired,
  id: string.isRequired,
  address: shape({
    streetAddress: string,
    streetNumber: string
  }).isRequired,
  category: oneOfType([string, arrayOf(string)]).isRequired,
  website: string,
  description: string,
  startDate: string,
  endDate: string,
  price: string,
  lon: number.isRequired,
  lat: number.isRequired,
  name: string.isRequired,
  images: arrayOf(string)
});
