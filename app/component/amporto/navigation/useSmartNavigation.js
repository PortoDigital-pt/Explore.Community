import { useMemo } from 'react';
import { useRouter } from 'found';
import { PATH_PREFIXES } from '../../../util/path';

const useSmartNavigation = () => {
  const { match } = useRouter();

  // show everywhere except digitransit
  const canShow = useMemo(
    () =>
      !Object.values(PATH_PREFIXES).find(path =>
        match.location.pathname.includes(path)
      ),
    [match.location.pathname]
  );

  return canShow;
};

export default useSmartNavigation;
