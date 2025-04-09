import React, { useMemo } from 'react';
import { useRouter } from 'found';
import classnames from 'classnames';
import { string } from 'prop-types';
import SidebarMenu from '../navigation/sidebar';
import withBreakpoint from '../../../util/withBreakpoint';
import Weather from '../weather';

const Topbar = ({ breakpoint }) => {
  const { match } = useRouter();

  const canShow = useMemo(
    () => !match.location.pathname.startsWith('/profile'),
    [match.location.pathname]
  );

  return (
    <div
      className={classnames('transparent-topbar', {
        hide: breakpoint === 'large' || !canShow
      })}
    >
      <Weather />
      <SidebarMenu shadow />
    </div>
  );
};

Topbar.propTypes = {
  breakpoint: string.isRequired
};

export default withBreakpoint(Topbar);
