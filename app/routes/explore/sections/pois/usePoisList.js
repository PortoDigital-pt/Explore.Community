import { useState, useEffect } from 'react';
import { getPoisList } from '../../../../util/apiUtils';

export const usePoisList = () => {
  const [pois, setPois] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getPoisList().then(setPois).catch(setError);
  }, []);

  return { pois, error };
};
