import { useState, useEffect } from 'react';
import distance from '@digitransit-search-util/digitransit-search-util-distance';
import { isValidLocation, isOver50Meters } from '../util/amporto/geo';

const useListData = ({
  enabled = true,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const [data, setData] = useState(null);
  const [count, setCount] = useState(null);
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
    if (!enabled) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    getData(
      {
        coords: isValidLocation(targetPoint, coordinatesBounds)
          ? `${targetPoint.lat},${targetPoint.lon}`
          : null,
        ...args
      },
      { signal }
    )
      .then(({ data, count }) => {
        setData(data);
        setCount(count);
      })
      .catch(error => !signal.aborted && setError(error));

    return () => controller.abort();
  }, [enabled, targetPoint, args]);

  return { data, count, error };
};

export default useListData;
