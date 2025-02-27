import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
import SidebarMenu from '../navigation/sidebar';
import withBreakpoint from '../../../util/withBreakpoint';
import useSmartNavigation from '../navigation/useSmartNavigation';

const Topbar = ({ breakpoint }) => {
  const canShow = useSmartNavigation();

  return (
    <div
      className={classnames('transparent-topbar', {
        hide: breakpoint === 'large' || !canShow
      })}
    >
      <SidebarMenu shadow />
    </div>
  );
};

Topbar.propTypes = {
  breakpoint: string.isRequired
};

export default withBreakpoint(Topbar);
