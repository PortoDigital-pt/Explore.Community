import { useMemo } from 'react';
import { useRouter } from 'found';
import { PATH_PREFIXES } from '../util/path';
import {
  COMMON_NAVIGATION_ITEMS,
  COMMON_NAVIGATION_ITEMS_PATH_MAP
} from '../component/amporto/navigation/common';

const getCurrentRoute = pathname => {
  // eslint-disable-next-line no-unused-vars
  const [_, path] = pathname.split('/');

  return (
    COMMON_NAVIGATION_ITEMS[path?.toUpperCase()] ??
    COMMON_NAVIGATION_ITEMS.EXPLORE
  );
};

const useRouteLevel = () => {
  const { match } = useRouter();
  const route = useMemo(
    () => getCurrentRoute(match.location.pathname),
    [match.location.pathname]
  );

  const isFirstLevelRoute = useMemo(
    () =>
      !!Object.values(COMMON_NAVIGATION_ITEMS_PATH_MAP).find(path =>
        route === COMMON_NAVIGATION_ITEMS.BROWSE
          ? match.location.pathname.startsWith(path) &&
            !Object.values(PATH_PREFIXES).find(prefix =>
              match.location.pathname.includes(prefix)
            )
          : path === match.location.pathname
      ),
    [match.location.pathname, route]
  );

  return { isFirstLevelRoute, route };
};

export default useRouteLevel;
