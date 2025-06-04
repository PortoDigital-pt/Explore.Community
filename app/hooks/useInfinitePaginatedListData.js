import { useState, useEffect, useCallback, useRef } from 'react';
import { isValidLocation } from '../util/amporto/geo';
import useTargetPoint from './useTargetPoint';

const useInfinitePaginatedListData = ({
  enabled = true,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const targetPoint = useTargetPoint({ location, coordinatesBounds });
  const targetPointRef = useRef(targetPoint);

  const argsString = JSON.stringify(args);
  const prevArgsStringRef = useRef(argsString);

  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const reset = useCallback(() => {
    setData(null);
    setPagination(null);
    setError(null);
    setPage(1);
  }, []);
  
  useEffect(() => {
    if (prevArgsStringRef.current !== argsString) {
      prevArgsStringRef.current = argsString;
      reset();
    }
  }, [argsString, reset]);

  useEffect(() => {
    if (targetPointRef.current !== targetPoint) {
      targetPointRef.current = targetPoint;
      reset();
    }
  }, [targetPoint, reset]);

  const onNextPage = useCallback(
    () => pagination?.hasNext && setPage(pagination.nextPage),
    [pagination]
  );

  const onSuccess = useCallback(
    ({ data, pagination: newPagination }) => {
      setData(previousData =>
        page === 1 ? data : [...(previousData || []), ...data]
      );
      setPagination(newPagination);
    },
    [page]
  );

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
        ...args,
        page
      },
      { signal }
    )
      .then(onSuccess)
      .catch(err => !signal.aborted && setError(err));

    return () => controller.abort();
  }, [enabled, targetPoint, argsString, page, onSuccess]);

  return {
    data,
    total: pagination?.total ?? null,
    error,
    onNextPage
  };
};

export default useInfinitePaginatedListData;
