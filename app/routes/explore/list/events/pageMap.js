import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { configShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import ListMap from '../listMap';

const EventListPageMap = ({ mapLayers }) => <ListMap mapLayers={mapLayers} />;

EventListPageMap.contextTypes = {
  config: configShape.isRequired
};

EventListPageMap.propTypes = {
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  EventListPageMap,
  ['MapLayerStore'],
  ({ getStore }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: 'events' })
  })
);
