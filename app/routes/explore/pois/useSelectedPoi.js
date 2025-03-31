import { useState, useEffect } from 'react';
import { getPoiById } from '../../../util/amporto/api';
import { dtoToPoi } from '../dto';

export const useSelectedPoi = ({ id, language }) => {
  const [selectedPoi, setSelectedPoi] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPoiById(id)
      .then(poiDto =>
        setSelectedPoi({ ...dtoToPoi(language, poiDto), type: 'pois' })
      )
      .catch(setError);
  }, [id, language]);

  return { selectedData: selectedPoi, error };
};
