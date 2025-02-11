import React, { useMemo } from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
import getContext from 'recompose/getContext';
import { intlShape } from 'react-intl';
import { configShape } from '../../../util/shapes';
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

const filterNavPaths = ({ showItineraries, showBlocks }) => {
  const navToRender = { ...NAVIGATION_PATHS };

  if (!showItineraries) {
    delete navToRender.ITINERARIES;
  }

  if (!showBlocks) {
    delete navToRender.BLOCKS;
  }

  return navToRender;
};

// WIP
// need to match route for active
// define mixins for fonts/bolds/colors to use on active

const NavigationBar = (
  { breakpoint },
  { config: { showItineraries, showBlocks }, intl }
) => {
  // const { match, router } = useRouter();

  const NavigationPaths = useMemo(
    () => filterNavPaths({ showItineraries, showBlocks }),
    [showItineraries, showBlocks]
  );

  return (
    <nav
      className={classnames('navbar', {
        hide: breakpoint === 'large'
      })}
    >
      {Object.values(NavigationPaths).map(path => (
        <NavButton
          key={path}
          path={path}
          description={intl.messages[`nav-item-${path}`]}
        />
      ))}
    </nav>
  );
};

NavigationBar.propTypes = {
  breakpoint: string.isRequired
};

NavigationBar.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default getContext({
  config: configShape.isRequired,
  intl: intlShape.isRequired
})(withBreakpoint(NavigationBar));
