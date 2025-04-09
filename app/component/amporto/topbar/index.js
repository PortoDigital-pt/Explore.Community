import React, { useMemo } from 'react';
import { useRouter } from 'found';
import classnames from 'classnames';
import { string } from 'prop-types';
import SidebarMenu from '../navigation/sidebar';
import withBreakpoint from '../../../util/withBreakpoint';
import Weather from '../weather';
import useRouteLevel from '../navigation/useRouteLevel';
import BackButton from '../../BackButton';

const Topbar = ({ breakpoint }) => {
  const { match } = useRouter();
  const { isFirstLevelRoute } = useRouteLevel();

  const canShow = useMemo(
    () => !match.location.pathname.startsWith('/profile'),
    [match.location.pathname]
  );
  
  return (
    <div
      className={classnames('transparent-topbar', {
        hide: !canShow
      })}
    >
      <div className='content'>
        {breakpoint !== 'large' && !isFirstLevelRoute && <BackButton small />}
      </div>
      <div className='content'>
        <Weather />
        {(breakpoint === 'large' && !isFirstLevelRoute || breakpoint !== 'large') && <SidebarMenu shadow /> }  
      </div>
    </div>
  );
};

Topbar.propTypes = {
  breakpoint: string.isRequired
};

export default withBreakpoint(Topbar);
