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
  generateNavigationItemsConfig
} from '../common';
import useSmartNavigation from '../useSmartNavigation';

const NAVIGATION_ITEMS = {
  ...COMMON_NAVIGATION_ITEMS,
  FAVOURITES: 'favourites'
};

const NAVIGATION_ITEMS_PATH_MAP = {
  ...COMMON_NAVIGATION_ITEMS_PATH_MAP,
  [NAVIGATION_ITEMS.FAVOURITES]: `/profile/${NAVIGATION_ITEMS.FAVOURITES}`
};

const ITEM_EXPRESSION_MAP = {
  [NAVIGATION_ITEMS.BROWSE]: new RegExp(/^\/(?!(explore|profile))(\w*)/, 'i'),
  [NAVIGATION_ITEMS.BLOCKS]: new RegExp(/^\/explore\/blocks$/, 'i'),
  [NAVIGATION_ITEMS.ROUTES]: new RegExp(/^\/explore\/routes$/, 'i')
}
// TODO: fix
const isActive = ({ pathname, item }) => {
  console.log('ITEM: ', item);
  console.log('PATHNAME: ', pathname);
  return ITEM_EXPRESSION_MAP[item]?.test(pathname) ?? pathname.startsWith(NAVIGATION_ITEMS_PATH_MAP[item]) 
} 
  //ITEM_EXPRESSION_MAP[item]?.test(pathname) ?? pathname.startsWith(NAVIGATION_ITEMS_PATH_MAP[item])

const BottomNavigationBar = (
  { breakpoint },
  { config: { optionalNavigationItems }, intl }
) => {
  const [client, setClient] = useState(false);
  const { match, router } = useRouter();
  const canShow = useSmartNavigation();
  const navigationItems = useMemo(
    () =>
      generateNavigationItemsConfig(optionalNavigationItems, NAVIGATION_ITEMS),
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
        hide: breakpoint === 'large' || !canShow
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

BottomNavigationBar.propTypes = {
  breakpoint: string.isRequired
};

BottomNavigationBar.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default getContext({
  config: configShape.isRequired,
  intl: intlShape.isRequired
})(withBreakpoint(BottomNavigationBar));
