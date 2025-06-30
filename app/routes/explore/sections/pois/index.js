import React from 'react';
import { string } from 'prop-types';
import { getPoiList } from '../../../../util/amporto/api';
import withBreakpoint from '../../../../util/withBreakpoint';
import Section from '../section';

const PoisSection = ({ breakpoint }) => (
  <Section
    getData={getPoiList}
    title="place-to-visit"
    cardType="small"
    bottomButtonText="find-all-interest"
    errorMessage="pois-fetch-error"
    emptyMessage="pois-empty"
    type="pois"
    limit={breakpoint === 'large' ? 2 : null}
  />
);

PoisSection.propTypes = {
  breakpoint: string.isRequired
}

export default withBreakpoint(PoisSection);
