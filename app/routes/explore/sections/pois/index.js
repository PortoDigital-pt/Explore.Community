import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { arrayOf, string } from 'prop-types';
import { intlShape } from 'react-intl';
import { locationShape, configShape } from '../../../../util/shapes';
import Skeleton from '../../../../component/amporto/skeleton';
import Card from '../../../../component/amporto/card';
import { usePoiList } from './usePoisList';
// TODO: extract resusable code

const PoisSection = (
  { location, selectedCategories },
  { intl, config: { coordinatesBounds } }
) => {
  const { pois, error } = usePoiList({
    location,
    coordinatesBounds,
    selectedCategories
  });
  console.log('POIS: ', pois);

  return (
    <div className="section">
      <h3 className="title">{intl.messages['place-to-visit']}</h3>
      <div className="list">
        {error ? (
          <>error message</>
        ) : (
          pois?.map((_, i) => <Card key={i} className="small" />) ??
          Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={`${i}-item`} className="small" />
          ))
        )}
      </div>
      <button
        className="show-all"
        type="button"
        aria-label={intl.messages['find-all-interest']}
      >
        {intl.messages['find-all-interest']}
      </button>
    </div>
  );
};

PoisSection.contextTypes = {
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

PoisSection.propTypes = {
  location: locationShape.isRequired,
  selectedCategories: arrayOf(string).isRequired
};

export default connectToStores(
  PoisSection,
  ['PositionStore', 'MapLayerStore'],
  ({ getStore }) => {
    const { pois } = getStore('MapLayerStore').getFilterLayers();
    const { showAll, ...categories } = pois;
    const selectedCategories = Object.entries(categories)
      .filter(([_, selected]) => selected)
      .map(([category]) => category);

    return {
      location: getStore('PositionStore').getLocationState(),
      selectedCategories
    };
  }
);
