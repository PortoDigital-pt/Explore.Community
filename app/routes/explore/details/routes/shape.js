import { arrayOf, number, shape, string } from 'prop-types';

export const touristTripShape = shape({
  type: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  pois: arrayOf(
    shape({
      position: number.isRequired,
      item: string.isRequired,
      name: string.isRequired,
      description: string.isRequired,
      duration: string.isRequired,
      difficulty: string.isRequired
    })
  )
});
