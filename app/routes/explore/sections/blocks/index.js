import React, { useMemo } from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getBlockList } from '../../../../util/amporto/api';
import withBreakpoint from '../../../../util/withBreakpoint';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const BlocksSection = ({ language, breakpoint }, { config }) => {
  const Intro = useMemo(
    () => () =>
      config.cards.blocks?.[language] ? (
        <p>{config.cards.blocks[language]}</p>
      ) : null,
    [language]
  );

  return (
    <Section
      getData={getBlockList}
      title="blocks-title"
      cardType="large"
      bottomButtonText="find-all-blocks"
      errorMessage="events-fetch-error"
      emptyMessage="events-empty"
      Intro={Intro}
      type="blocks"
      showDescription
      requireCategories={false}
      limit={breakpoint === 'large' ? 1 : 10}
    />
  );
};

BlocksSection.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired
};

BlocksSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  withBreakpoint(BlocksSection),
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
