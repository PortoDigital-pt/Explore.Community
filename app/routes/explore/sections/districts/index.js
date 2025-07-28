import React, { useMemo } from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getDistrictList } from '../../../../util/amporto/api';
import withBreakpoint from '../../../../util/withBreakpoint';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const DistrictsSection = ({ language, breakpoint }, { config }) => {
  const Intro = useMemo(
    () => () =>
      config.cards.districts?.[language] ? (
        <p>{config.cards.districts[language]}</p>
      ) : null,
    [language]
  );

  return (
    <Section
      getData={getDistrictList}
      title="districts-title"
      cardType="large"
      bottomButtonText="find-all-districts"
      errorMessage="events-fetch-error"
      emptyMessage="events-empty"
      Intro={Intro}
      type="districts"
      showDescription
      requireCategories={false}
      limit={breakpoint === 'large' ? 1 : 10}
    />
  );
};

DistrictsSection.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired
};

DistrictsSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  withBreakpoint(DistrictsSection),
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
