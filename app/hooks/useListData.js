import { useState, useEffect } from 'react';
import { isValidLocation } from '../util/amporto/geo';

const useListData = ({
  language,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData({
      language,
      coords: isValidLocation(location, coordinatesBounds)
        ? `${location.lat},${location.lon}`
        : null,
      ...args
    })
      .then(setData)
      .catch(setError);
  }, [
    location.hasLocation,
    location.lat,
    location.lon,
    ...Object.values(args),
    language
  ]);

  return { data, error };
};

export default useListData;
