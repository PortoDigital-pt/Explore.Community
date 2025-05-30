import React from 'react';
import { getRoutesList } from '../../../../util/amporto/api';
import Section from '../section';

const RoutesSection = () => (
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

export default RoutesSection;
