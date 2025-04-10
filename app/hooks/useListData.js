import { useState, useEffect } from 'react';
import distance from '@digitransit-search-util/digitransit-search-util-distance';
import { isValidLocation, isOver50Meters } from '../util/amporto/geo';

const useListData = ({
  language,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [targetPoint, setTargetPoint] = useState(null);
 
  useEffect(() => {
    if (!targetPoint) {
      setTargetPoint(location);
      return;
    }
  
    if (!isOver50Meters(distance(targetPoint, location))) {
      return;
    }

    setTargetPoint(location);
  }, [targetPoint, location]);
  
  useEffect(() => {
    getData({
      language,
      coords: isValidLocation(targetPoint, coordinatesBounds)
        ? `${targetPoint.lat},${targetPoint.lon}`
        : null,
      ...args
    })
      .then(setData)
      .catch(setError);
  }, [language, targetPoint, args]);

  return { data, error };
};

export default useListData;
