import React from 'react';
import { usePoiList } from './usePoisList';
import Section from '../section';

const PoisSection = () => (
  <Section
    useDataList={usePoiList}
    title="place-to-visit"
    cardType="small"
    bottomButtonText="find-all-interest"
  />
);

export default PoisSection;
