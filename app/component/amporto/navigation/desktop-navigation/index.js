import React from 'react';
import useRouter from 'found/useRouter';
import { intlShape } from 'react-intl';
import SidebarMenu from '../sidebar';
import useSmartNavigation from '../useSmartNavigation';
import { COMMON_NAVIGATION_ITEMS } from '../common';

const NAVIGATION_ITEMS = {
  ...COMMON_NAVIGATION_ITEMS,
  FAVOURITES: 'favourites'
};

const getCurrentRoute = pathname => {
  const path = pathname.split('/')[0];
  return NAVIGATION_ITEMS[path?.toUpperCase()] ?? NAVIGATION_ITEMS.BROWSE;
};

const DesktopNavigation = (_, { intl }) => {
  const { match } = useRouter();
  const canShow = useSmartNavigation();

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
