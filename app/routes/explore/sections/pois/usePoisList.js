import { useState, useEffect } from 'react';
import { getPoiList } from '../../../../util/amporto/api';
import { isValidLocation } from '../../../../util/amporto/geo';
import { dtoToPoi } from '../../dto';

export const usePoiList = ({
  language,
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
      .then(poisDto =>
        setPois(
          poisDto.map(dto => ({ ...dtoToPoi(language, dto), type: 'pois' }))
        )
      )
      .catch(setError);
  }, [
    location.hasLocation,
    location.lat,
    location.lon,
    selectedCategories,
    language
  ]);

  return { data: pois, error };
};
