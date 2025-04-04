import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { configShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import ListMap from '../listMap';

const RoutesListPageMap = ({ mapLayers }) => <ListMap mapLayers={mapLayers} />;

RoutesListPageMap.contextTypes = {
  config: configShape.isRequired
};

RoutesListPageMap.propTypes = {
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  RoutesListPageMap,
  ['MapLayerStore'],
  ({ getStore }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers()
  })
);
