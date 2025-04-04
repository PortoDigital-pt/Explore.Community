import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { configShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import ListMap from '../listMap';

const BlocksListPageMap = ({ mapLayers }) => <ListMap mapLayers={mapLayers} />;

BlocksListPageMap.contextTypes = {
  config: configShape.isRequired
};

BlocksListPageMap.propTypes = {
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  BlocksListPageMap,
  ['MapLayerStore'],
  ({ getStore }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers()
  })
);
