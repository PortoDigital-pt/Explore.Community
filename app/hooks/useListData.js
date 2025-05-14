import { useState, useEffect } from 'react';
import { isValidLocation } from '../util/amporto/geo';
import useTargetPoint from './useTargetPoint';

const useListData = ({
  enabled = true,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const targetPoint = useTargetPoint({ location, coordinatesBounds });
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!enabled) {
      return;
    }

    console.log('log-args ', args);
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
      .then(({ data }) => setData(data))
      .catch(error => !signal.aborted && setError(error));

    return () => controller.abort();
  }, [enabled, targetPoint, args]);

  return { data, error };
};

export default useListData;
