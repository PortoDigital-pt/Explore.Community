import React from 'react';
import { string } from 'prop-types';
import { getRoutesList } from '../../../../util/amporto/api';
import withBreakpoint from '../../../../util/withBreakpoint';
import Section from '../section';

const RoutesSection = ({ breakpoint }) => (
  <Section
    getData={getRoutesList}
    title="routes-title"
    cardType="large"
    bottomButtonText="find-all-routes"
    errorMessage="events-fetch-error"
    emptyMessage="events-empty"
    type="routes"
    showDescription
    limit={breakpoint === 'large' ? 1 : null}
  />
);

RoutesSection.propTypes = {
  breakpoint: string.isRequired
}

export default withBreakpoint(RoutesSection);
