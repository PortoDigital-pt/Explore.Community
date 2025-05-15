import React from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getTouristTripList } from '../../../../util/amporto/api';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const TouristTripSection = ({ language }, { config }) => {
  return (
    <Section
      getData={getTouristTripList}
      title="touristic-itinerary-title"
      cardType="large"
      bottomButtonText="find-all-events"
      errorMessage="events-fetch-error"
      emptyMessage="events-empty"
      type="touristTrips"
    />
  );
};

TouristTripSection.propTypes = {
  language: string.isRequired
};

TouristTripSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  TouristTripSection,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
