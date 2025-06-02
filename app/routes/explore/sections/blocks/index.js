import React, { useMemo } from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getBlockList } from '../../../../util/amporto/api';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const BlocksSection = ({ language }, { config }) => {
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
    />
  );
};

BlocksSection.propTypes = {
  language: string.isRequired
};

BlocksSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  BlocksSection,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
