import { useState, useEffect } from 'react';
import { getPoiList } from '../../../../util/amporto/api';
import { isValidLocation } from '../../../../util/amporto/geo';

export const usePoiList = ({
  location,
  coordinatesBounds,
  selectedCategories
}) => {
  const [pois, setPois] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPoiList({
      coords: isValidLocation(location, coordinatesBounds)
        ? `${location.lat},${location.lon}`
        : null,
      categories: selectedCategories.length > 0 ? selectedCategories : null
    })
      .then(setPois)
      .catch(setError);
  }, [location.hasLocation, location.lat, location.lon, selectedCategories]);

  return { pois, error };
};
