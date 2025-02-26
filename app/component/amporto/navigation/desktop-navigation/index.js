import React from 'react';
import SidebarMenu from '../sidebar';
import useSmartNavigation from '../useSmartNavigation';

const DesktopNavigation = () => {
  const canShow = useSmartNavigation();

  return (
    canShow && (
      <div className="desktop-navigation-content">
        <SidebarMenu />
      </div>
    )
  );
};

export default DesktopNavigation;
