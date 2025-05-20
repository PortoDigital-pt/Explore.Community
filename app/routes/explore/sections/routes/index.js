import React from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getTouristTripList } from '../../../../util/amporto/api';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const RoutesSection = ({ language }, { config }) => {
  return (
    <Section
      getData={getTouristTripList}
      title="routes-title"
      cardType="large"
      bottomButtonText="find-all-routes"
      errorMessage="events-fetch-error"
      emptyMessage="events-empty"
      type="routes"
    />
  );
};

RoutesSection.propTypes = {
  language: string.isRequired
};

RoutesSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  RoutesSection,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
