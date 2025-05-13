import React from 'react';
import { intlShape } from 'react-intl';
import SidebarMenu from '../sidebar';
import useRouteLevel from '../../../../hooks/useRouteLevel';

const DesktopNavigation = (_, { intl }) => {
  const { isFirstLevelRoute, route } = useRouteLevel();
  
  return (
    isFirstLevelRoute && (
      <div className="desktop-navigation-content">
        <SidebarMenu />
        <h5>{intl.messages[`nav-item-${route}`]}</h5>
      </div>
    )
  );
};

DesktopNavigation.contextTypes = {
  intl: intlShape.isRequired
};

export default DesktopNavigation;
