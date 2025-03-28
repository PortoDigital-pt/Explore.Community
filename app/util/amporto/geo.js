export const showDistance = distanceInMeters => {
  const distance = Math.round((distanceInMeters + Number.EPSILON) * 100) / 100;

  if (distance < 1000) {
    return `${distance} m`;
  }

  return `${Math.round((distance / 1000 + Number.EPSILON) * 100) / 100} km`;
};

const isBetween = (value, min, max) => {
  return value >= min && value <= max;
};

/**
 * Checks whether a certain location is within the configurable coordinates bounds
 *
 * @param {object} location current user location
 * @param {object} coordinatesBounds coordinates bounds configuration definition
 */
export const isValidLocation = (location, coordinatesBounds) => {
  if (!location.hasLocation) {
    return false;
  }

  const { minLat, maxLat, minLon, maxLon } = coordinatesBounds;
  const { lat, lon } = location;

  return isBetween(lat, minLat, maxLat) && isBetween(lon, minLon, maxLon);
};
