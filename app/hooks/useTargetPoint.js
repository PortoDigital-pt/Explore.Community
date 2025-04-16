import { useState, useEffect } from 'react';
import distance from '@digitransit-search-util/digitransit-search-util-distance';
import { isOver50Meters, isValidLocation } from '../util/amporto/geo';

const useTargetPoint = ({ location, coordinatesBounds }) => {
  const [targetPoint, setTargetPoint] = useState(location);

  useEffect(() => {
    if (!isValidLocation(location, coordinatesBounds)) {
      return;
    }

    if (!isOver50Meters(distance(targetPoint, location))) {
      return;
    }

    setTargetPoint(location);
  }, [targetPoint, location]);

  return targetPoint;
};

export default useTargetPoint;
