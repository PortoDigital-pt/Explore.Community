import React, { useState, useEffect } from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
import SidebarMenu from '../navigation/sidebar';
import withBreakpoint from '../../../util/withBreakpoint';

const Topbar = ({ breakpoint }) => {
  const [client, setClient] = useState(false);

  useEffect(() => {
    if (!client) {
      setClient(true);
    }
  }, [client, setClient]);

  if (!client) {
    return null;
  }

  return (
    <div
      className={classnames('transparent-topbar', {
        hide: breakpoint === 'large'
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
