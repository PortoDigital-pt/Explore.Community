import { useState, useEffect } from 'react';
import { getPoiById } from '../../../util/apiUtils';

const dtoToPoi = (language, poiDto) => {
  return {
    ...poiDto,
    category: poiDto.category?.[language] ?? poiDto.category?.pt ?? 'Missing',
    description:
      poiDto.description?.[language] ?? poiDto.description?.pt ?? 'Missing',
    name: poiDto.name?.[language] ?? poiDto.name?.pt ?? 'Missing'
  };
};

export const useSelectedPoi = ({ id, language }) => {
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPoiById(id).then(poiDto => setSelectedPoi(dtoToPoi(language, poiDto))).catch(setError);
  }, [id, language]);

  return { selectedPoi, error };
};
