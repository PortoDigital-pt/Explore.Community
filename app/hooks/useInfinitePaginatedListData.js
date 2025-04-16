import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { isValidLocation } from '../util/amporto/geo';
import useTargetPoint from './useTargetPoint';

// TODO: when reseting show loading state?

const useInfinitePaginatedListData = ({
  enabled = true,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const targetPoint = useTargetPoint({ location, coordinatesBounds });
  const targetPointRef = useRef(targetPoint);
  const argsRef = useRef(args);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const targetPointHasChanged = useMemo(
    () => targetPoint !== targetPointRef.current,
    [targetPoint, targetPointRef.current]
  );
  const argsHaveChanged = useMemo(
    () => args !== argsRef.current,
    [args, argsRef.current]
  );

  const reset = useCallback(() => setPage(1), [setPage]);

  const onNextPage = useCallback(
    () => pagination?.hasNext && setPage(pagination.nextPage),
    [pagination, setPage]
  );

  const onSuccess = useCallback(
    ({ data, pagination }) => {
      page === 1
        ? setData(data)
        : setData(previous => [...(previous || []), ...data]);
      setPagination(pagination);
    },
    [page, setData, setPagination]
  );

  useEffect(() => {
    if (targetPointHasChanged) {
      targetPointRef.current = targetPoint;
      reset();
    }
  }, [targetPointHasChanged, targetPoint, targetPointRef.current, reset]);

  useEffect(() => {
    if (argsHaveChanged) {
      argsRef.current = args;
      reset();
    }
  }, [argsHaveChanged, args, argsRef.current, reset]);

  useEffect(() => {
    if (argsHaveChanged || targetPointHasChanged || !enabled) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;
    console.log('Fetch');
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
      .catch(error => !signal.aborted && setError(error));

    return () => controller.abort();
  }, [
    enabled,
    targetPoint,
    args,
    page,
    targetPointHasChanged,
    argsHaveChanged,
    onSuccess
  ]);

  return { data, total: pagination?.total ?? null, error, onNextPage };
};

export default useInfinitePaginatedListData;
