import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { arrayOf, string } from 'prop-types';
import { getPoiList } from '../../../../util/amporto/api';
import Section from '../section';

const PoisSection = ({ categories }) =>
  categories && (
    <Section
      categories={categories}
      getData={getPoiList}
      title="place-to-visit"
      cardType="small"
      bottomButtonText="find-all-interest"
      errorMessage="pois-fetch-error"
      emptyMessage="pois-empty"
      type="pois"
    />
  );

PoisSection.propTypes = {
  categories: arrayOf(string)
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
      categories: selectedCategories.length > 0 ? selectedCategories : null
    };
  }
);
