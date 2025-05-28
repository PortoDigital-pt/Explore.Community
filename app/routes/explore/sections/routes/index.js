import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { getRoutesList } from '../../../../util/amporto/api';
import Section from '../section';

const RoutesSection = () => {
  return (
    <Section
      getData={getRoutesList}
      title="routes-title"
      cardType="large"
      bottomButtonText="find-all-routes"
      errorMessage="events-fetch-error"
      emptyMessage="events-empty"
      type="routes"
    />
  );
};

export default connectToStores(
  RoutesSection,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
