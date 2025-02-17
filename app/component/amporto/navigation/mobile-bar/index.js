import React, { useMemo, useCallback, useState, useEffect } from 'react';
import { useRouter } from 'found';
import classnames from 'classnames';
import { string } from 'prop-types';
import getContext from 'recompose/getContext';
import { intlShape } from 'react-intl';
import { configShape } from '../../../../util/shapes';
import { NavTab } from './tab';
import withBreakpoint from '../../../../util/withBreakpoint';
import {
  COMMON_NAVIGATION_ITEMS,
  COMMON_NAVIGATION_ITEMS_PATH_MAP,
  filterOptionalNavigationItems
} from '../common';

const NAVIGATION_ITEMS = {
  ...COMMON_NAVIGATION_ITEMS,
  FAVOURITES: 'favourites'
};

const NAVIGATION_ITEMS_PATH_MAP = {
  ...COMMON_NAVIGATION_ITEMS_PATH_MAP,
  [NAVIGATION_ITEMS.FAVOURITES]: `/${NAVIGATION_ITEMS.FAVOURITES}`
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
  { config: { optionalNavigationItems }, intl }
) => {
  const [client, setClient] = useState(false);
  const { match, router } = useRouter();

  const navigationItems = useMemo(
    () =>
      filterOptionalNavigationItems(optionalNavigationItems, NAVIGATION_ITEMS),
    [optionalNavigationItems]
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
        hide: breakpoint === 'large'
      })}
    >
      {Object.values(navigationItems).map(item => (
        <NavTab
          key={item}
          item={item}
          onClick={() => navigate(item)}
          aria={intl.messages[`nav-item-aria-${item}`]}
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
