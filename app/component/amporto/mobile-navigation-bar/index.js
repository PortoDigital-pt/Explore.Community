import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'found';
import classnames from 'classnames';
import { string } from 'prop-types';
import getContext from 'recompose/getContext';
import { intlShape } from 'react-intl';
import { configShape } from '../../../util/shapes';
import { NavButton } from './button';
import withBreakpoint from '../../../util/withBreakpoint';

const NAVIGATION_ITEMS = {
  EXPLORE: 'explore',
  NAVIGATE: 'navigate',
  ITINERARIES: 'itineraries',
  BLOCKS: 'blocks',
  FAVOURITES: 'favourites'
};

const NAVIGATION_ITEMS_PATH_MAP = {
  [NAVIGATION_ITEMS.EXPLORE]: `/${NAVIGATION_ITEMS.EXPLORE}`,
  [NAVIGATION_ITEMS.NAVIGATE]: '/',
  [NAVIGATION_ITEMS.ITINERARIES]: `/${NAVIGATION_ITEMS.ITINERARIES}`,
  [NAVIGATION_ITEMS.BLOCKS]: `/${NAVIGATION_ITEMS.BLOCKS}`,
  [NAVIGATION_ITEMS.FAVOURITES]: `/${NAVIGATION_ITEMS.FAVOURITES}`
};

const filterNavigationItems = ({ showItineraries, showBlocks }) => {
  const navToRender = { ...NAVIGATION_ITEMS };

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
  const { router } = useRouter();

  const NavigationItems = useMemo(
    () => filterNavigationItems({ showItineraries, showBlocks }),
    [showItineraries, showBlocks]
  );

  const onNavigation = useCallback(
    item => router.push(NAVIGATION_ITEMS_PATH_MAP[item]),
    [router.push]
  );

  return (
    <nav
      className={classnames('navbar', {
        hide: breakpoint === 'large'
      })}
    >
      {Object.values(NavigationItems).map(item => (
        <NavButton
          key={item}
          item={item}
          onClick={() => onNavigation(item)}
          description={intl.messages[`nav-item-${item}`]}
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
