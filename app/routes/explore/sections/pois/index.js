import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { arrayOf, string } from 'prop-types';
import { usePoiList } from './usePoiList';
import Section from '../section';

const PoisSection = ({ selectedCategories }) => (
  selectedCategories && (<Section
    selectedCategories={selectedCategories}
    useDataList={usePoiList}
    title="place-to-visit"
    cardType="small"
    bottomButtonText="find-all-interest"
    errorMessage="pois-fetch-error"
  />)
);

PoisSection.propTypes = {
  selectedCategories: arrayOf(string).isRequired
};

export default connectToStores(
  PoisSection,
  ['MapLayerStore'],
  ({ getStore }) => {
    const { pois } = getStore('MapLayerStore').getFilterLayers();
    const { showAll, ...categories } = pois;
    const selectedCategories = Object.entries(categories)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, selected]) => selected)
      .map(([category]) => category);

    return {
      selectedCategories: selectedCategories.length > 0 ? selectedCategories : null
    };
  }
);
