import React, { useMemo } from 'react';
import useRouter from 'found/useRouter';
import { intlShape } from 'react-intl';
import SidebarMenu from '../sidebar';
import {
  COMMON_NAVIGATION_ITEMS,
  COMMON_NAVIGATION_ITEMS_PATH_MAP
} from '../common';
import { PATH_PREFIXES } from '../../../../util/path';

const getCurrentRoute = pathname => {
  // eslint-disable-next-line no-unused-vars
  const [_, first, second] = pathname.split('/');
  return (
    COMMON_NAVIGATION_ITEMS[second?.toUpperCase()] ??
    COMMON_NAVIGATION_ITEMS[first?.toUpperCase()] ??
    COMMON_NAVIGATION_ITEMS.BROWSE
  );
};

const DesktopNavigation = (_, { intl }) => {
  const { match } = useRouter();
  const currentRoute = useMemo(
    () => getCurrentRoute(match.location.pathname),
    [match.location.pathname]
  );

  // only show at exact path
  const canShow = useMemo(
    () =>
      !!Object.values(COMMON_NAVIGATION_ITEMS_PATH_MAP).find(path =>
        currentRoute === COMMON_NAVIGATION_ITEMS.BROWSE
          ? match.location.pathname.startsWith(path) &&
            !Object.values(PATH_PREFIXES).find(prefix =>
              match.location.pathname.includes(prefix)
            )
          : path === match.location.pathname
      ),
    [match.location.pathname, currentRoute]
  );

  return (
    canShow && (
      <div className="desktop-navigation-content">
        <SidebarMenu />
        <h5>{intl.messages[`nav-item-${currentRoute}`]}</h5>
      </div>
    )
  );
};

DesktopNavigation.contextTypes = {
  intl: intlShape.isRequired
};

export default DesktopNavigation;
