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
  FAVOURITES: 'favourites'
};

// WIP
// will depend on config - iteneraries + blocks. connect to store?
// need to match route for active
// need to translate PT/EN - connect to store?
// define mixins for fonts/bolds/colors to use on active


const NavigationBar = ({ breakpoint }) => {
  // const { match, router } = useRouter();

  return (
    <nav
      className={classnames('navbar', {
        hide: breakpoint === 'large'
      })}
    >
      {Object.values(NAVIGATION_PATHS).map(path => (
        <NavButton key={path} path={path} description={path} />
      ))}
    </nav>
  );
};

NavigationBar.propTypes = {
  breakpoint: string.isRequired
};

export const MobileNavigationBar = withBreakpoint(NavigationBar);
