import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { isValidLocation } from '../util/amporto/geo';
import useTargetPoint from './useTargetPoint';

// TODO: if args change, reset? since categories/language might change, and the first page needs to be fetched

const useInfinitePaginatedListData = ({
  enabled = true,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const targetPoint = useTargetPoint({ location, coordinatesBounds });
  const targetPointRef = useRef(targetPoint);
  const [data, setData] = useState(null);
  const [pagination, setPagination] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const targetPointHasChanged = useMemo(
    () => targetPoint !== targetPointRef.current,
    [targetPoint, targetPointRef.current]
  );

  const reset = useCallback(() => setPage(1), [setPage]);

  const onNextPage = useCallback(
    () => pagination?.hasNext && setPage(pagination.nextPage),
    [pagination, setPage]
  );

  const onSuccess = useCallback(
    ({ data, pagination }) => {
      targetPointHasChanged
        ? setData(data)
        : setData(previous => [...(previous || []), ...data]);
      setPagination(pagination);
    },
    [targetPointHasChanged, setData, setPagination]
  );

  useEffect(() => {
    if (targetPointHasChanged) {
      targetPointRef.current = targetPoint;
      reset();
    }
  }, [targetPointHasChanged, targetPoint, targetPointRef.current, reset]);

  useEffect(() => {
    if (targetPointHasChanged || !enabled) {
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
      .catch(error => !signal.aborted && setError(error));

    return () => controller.abort();
  }, [enabled, targetPoint, args, page, targetPointHasChanged, onSuccess]);

  return { data, total: pagination?.total ?? null, error, onNextPage };
};

export default useInfinitePaginatedListData;
