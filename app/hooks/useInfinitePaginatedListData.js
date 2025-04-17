import {
  useState,
  useEffect,
  useLayoutEffect,
  useCallback,
  useRef,
  useMemo
} from 'react';
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

  const reset = useCallback(() => {
    setData(null);
    setPagination(null);
    setError(null);
    setPage(1);
  }, []);

  const onNextPage = useCallback(
    () => pagination?.hasNext && setPage(pagination.nextPage),
    [pagination, setPage]
  );

  const onSuccess = useCallback(
    ({ data, pagination }) => {
      setData(previous => (page === 1 ? data : [...(previous || []), ...data]));
      setPagination(pagination);
    },
    [page, setData, setPagination]
  );

  useLayoutEffect(() => {
    if (targetPointHasChanged) {
      targetPointRef.current = targetPoint;
      reset();
    }
  }, [targetPointHasChanged, targetPoint, targetPointRef.current, reset]);

  useLayoutEffect(() => {
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
