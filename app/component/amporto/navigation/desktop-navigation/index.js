import React, { useMemo } from 'react';
import useRouter from 'found/useRouter';
import { intlShape } from 'react-intl';
import SidebarMenu from '../sidebar';
import {
  COMMON_NAVIGATION_ITEMS,
  COMMON_NAVIGATION_ITEMS_PATH_MAP
} from '../common';

const getCurrentRoute = pathname => {
  const [_, first, second] = pathname.split('/');
  return COMMON_NAVIGATION_ITEMS[second?.toUpperCase()] ?? COMMON_NAVIGATION_ITEMS[first?.toUpperCase()] ?? COMMON_NAVIGATION_ITEMS.BROWSE;
};

const DesktopNavigation = (_, { intl }) => {
  const { match } = useRouter();

  // only show at exact path
  const canShow = useMemo(
    () =>
      !!Object.values(COMMON_NAVIGATION_ITEMS_PATH_MAP).find(
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
