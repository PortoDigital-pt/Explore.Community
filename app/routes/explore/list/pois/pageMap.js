import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { configShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import ListMap from '../listMap';

const PoiListPageMap = ({ mapLayers }) => <ListMap mapLayers={mapLayers} />;

PoiListPageMap.contextTypes = {
  config: configShape.isRequired
};

PoiListPageMap.propTypes = {
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  PoiListPageMap,
  ['MapLayerStore'],
  ({ getStore }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: 'pois' })
  })
);
