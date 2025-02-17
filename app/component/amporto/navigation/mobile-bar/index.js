import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'found';
import classnames from 'classnames';
import { string } from 'prop-types';
import getContext from 'recompose/getContext';
import { intlShape } from 'react-intl';
import { configShape } from '../../../../util/shapes';
import { NavTab } from './tab';
import withBreakpoint from '../../../../util/withBreakpoint';

export const NAVIGATION_ITEMS = {
  EXPLORE: 'explore',
  NAVIGATE: 'navigate',
  ITINERARIES: 'itineraries',
  BLOCKS: 'blocks',
  FAVOURITES: 'favourites'
};

export const NAVIGATION_ITEMS_PATH_MAP = {
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

const notNavigateExpression = new RegExp(
  `^\/(?!(${NAVIGATION_ITEMS.EXPLORE}|${NAVIGATION_ITEMS.ITINERARIES}|${NAVIGATION_ITEMS.BLOCKS}|${NAVIGATION_ITEMS.FAVOURITES}))(\w*)`,
  'i'
);
const isActive = ({ pathname, item }) =>
  item === NAVIGATION_ITEMS.NAVIGATE
    ? notNavigateExpression.test(pathname)
    : pathname.startsWith(`/${item}`);

const NavigationBar = (
  { breakpoint },
  { config: { showItineraries, showBlocks }, intl }
) => {
  const [client, setClient] = useState(false);
  const { match, router } = useRouter();

  const navigationItems = useMemo(
    () => filterNavigationItems({ showItineraries, showBlocks }),
    [showItineraries, showBlocks]
  );

  const navigate = useCallback(
    item => router.push(NAVIGATION_ITEMS_PATH_MAP[item]),
    [router.push]
  );

  useEffect(() => {
    if (!client) {
      setClient(true);
    }
  }, [client, setClient]);

  if (!client) {
    return null;
  }

  return (
    <nav
      className={classnames('navbar', {
        hide: breakpoint !== 'small'
      })}
    >
      {Object.values(navigationItems).map(item => (
        <NavTab
          key={item}
          item={item}
          onClick={() => navigate(item)}
          description={intl.messages[`nav-item-${item}`]}
          active={isActive({ pathname: match.location.pathname, item })}
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
