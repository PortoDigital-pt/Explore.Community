import React from 'react';
import { getPoiList } from '../../../../util/amporto/api';
import Section from '../section';

const PoisSection = () => (
  <Section
    getData={getPoiList}
    title="place-to-visit"
    cardType="small"
    bottomButtonText="find-all-interest"
    errorMessage="pois-fetch-error"
    emptyMessage="pois-empty"
    type="pois"
  />
);

export default PoisSection;
