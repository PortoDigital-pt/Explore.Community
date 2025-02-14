import React, { useMemo, useCallback } from 'react';
import { useRouter } from 'found';
import { func } from 'prop-types';
import { intlShape } from 'react-intl';
import getContext from 'recompose/getContext';
import Icon from '../../../Icon';
import LanguageSelect from '../../language';
import { configShape } from '../../../../util/shapes';

// TODO: name from config?

export const NAVIGATION_ITEMS = {
  EXPLORE: 'explore',
  NAVIGATE: 'navigate',
  ITINERARIES: 'itineraries',
  BLOCKS: 'blocks'
};

export const NAVIGATION_ITEMS_PATH_MAP = {
  [NAVIGATION_ITEMS.EXPLORE]: `/${NAVIGATION_ITEMS.EXPLORE}`,
  [NAVIGATION_ITEMS.NAVIGATE]: '/',
  [NAVIGATION_ITEMS.ITINERARIES]: `/${NAVIGATION_ITEMS.ITINERARIES}`,
  [NAVIGATION_ITEMS.BLOCKS]: `/${NAVIGATION_ITEMS.BLOCKS}`
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

const Content = (
  { onClose },
  { config: { showItineraries, showBlocks }, intl }
) => {
  const { router } = useRouter();

  const navigationItems = useMemo(
    () => filterNavigationItems({ showItineraries, showBlocks }),
    [showItineraries, showBlocks]
  );

  const navigate = useCallback(
    item => {
      onClose();
      router.push(NAVIGATION_ITEMS_PATH_MAP[item]);
    },
    [router.push, onClose]
  );

  return (
    <>
      <>
        <div className="top">
          <h1>Explore.Porto</h1>
          <button onClick={onClose} type="button">
            <Icon img="icon-close" viewBox="0 0 33 33" />
          </button>
        </div>
        <LanguageSelect />
        <nav>
          {Object.values(navigationItems).map(item => (
            <button key={item} onClick={() => navigate(item)} type="button">
              <Icon img={`icon-${item}`} viewBox="0 0 24 24" />
              <span>{intl.messages[`nav-item-${item}`]}</span>
            </button>
          ))}
        </nav>
      </>
      <footer>
        <hr />
        <button type='button'>Política de privacidade</button>
        <button type='button'>Política de cookies</button>
      </footer>
    </>
  );
};

Content.propTypes = {
  onClose: func.isRequired
};

Content.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default getContext({
  config: configShape.isRequired,
  intl: intlShape.isRequired
})(Content);
