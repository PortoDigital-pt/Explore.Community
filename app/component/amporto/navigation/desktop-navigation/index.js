import React, { useMemo } from 'react';
import useRouter from 'found/useRouter';
import { intlShape } from 'react-intl';
import SidebarMenu from '../sidebar';
import {
  COMMON_NAVIGATION_ITEMS,
  COMMON_NAVIGATION_ITEMS_PATH_MAP
} from '../common';

const NAVIGATION_ITEMS = {
  ...COMMON_NAVIGATION_ITEMS,
  FAVOURITES: 'favourites'
};

const NAVIGATION_ITEMS_PATH_MAP = {
  ...COMMON_NAVIGATION_ITEMS_PATH_MAP,
  [NAVIGATION_ITEMS.FAVOURITES]: `/${NAVIGATION_ITEMS.FAVOURITES}`
};

const getCurrentRoute = pathname => {
  const path = pathname.split('/')[1];
  return NAVIGATION_ITEMS[path?.toUpperCase()] ?? NAVIGATION_ITEMS.BROWSE;
};

const DesktopNavigation = (_, { intl }) => {
  const { match } = useRouter();

  // only show at exact path
  const canShow = useMemo(
    () =>
      !!Object.values(NAVIGATION_ITEMS_PATH_MAP).find(
        path => path === match.location.pathname
      ),
    [match.location.pathname]
  );

  return (
    canShow && (
      <div className="desktop-navigation-content">
        <SidebarMenu />
        <h5>
          {
            intl.messages[
              `nav-item-${getCurrentRoute(match.location.pathname)}`
            ]
          }
        </h5>
      </div>
    )
  );
};

DesktopNavigation.contextTypes = {
  intl: intlShape.isRequired
};

export default DesktopNavigation;
