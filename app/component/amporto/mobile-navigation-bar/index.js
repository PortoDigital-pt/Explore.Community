import React from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
// import { useRouter } from 'found';
import { NavButton } from './button';
import withBreakpoint from '../../../util/withBreakpoint';

const NAVIGATION_PATHS = {
  EXPLORE: 'explore',
  NAVIGATE: 'navigate',
  ITINERARIES: 'itineraries',
  BLOCKS: 'blocks',
  FAVOURITES: 'favourites',
};

// WIP
// will depend on config - iteneraries + blocks
// need to match route for active
// need to translate PT/EN

const NavigationBar = ({ breakpoint }) => {
  // const { match, router } = useRouter();

  return (
    <div
      className={classnames('navbar', {
        hide: breakpoint === 'large',
      })}
    >
      <div>
        {Object.values(NAVIGATION_PATHS).map(path => (
          <NavButton key={path} path={path} description={path} />
        ))}
      </div>
    </div>
  );
};

NavigationBar.propTypes = {
  breakpoint: string.isRequired
};

export const MobileNavigationBar = withBreakpoint(NavigationBar);
