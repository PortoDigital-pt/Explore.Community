import React from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
import SidebarMenu from '../navigation/sidebar';
import withBreakpoint from '../../../util/withBreakpoint';
import Weather from '../weather';

const Topbar = ({ breakpoint }) => (
    <div
      className={classnames('transparent-topbar', {
        hide: breakpoint === 'large' 
      })}
    >
      <Weather />
      <SidebarMenu shadow />
    </div>
);

Topbar.propTypes = {
  breakpoint: string.isRequired
};

export default withBreakpoint(Topbar);
