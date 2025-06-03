import React, { useEffect, useState } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { boundWithMinimumArea } from '../../../../util/geo-utils';
import MapWithTracking from '../../../../component/map/MapWithTracking';
import { configShape, locationShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import { getRoutesList } from '../../../../util/amporto/api';

const ListMap = (
  { location, mapLayers },
  { config: { coordinatesBounds, defaultEndpoint } }
) => {
  const [bounds, setBounds] = useState([]);

  const getRoutes = async () => {
    const controller = new AbortController();
    const { signal } = controller;

    const selectedCategories = Object.entries(mapLayers.routes)
      .filter(([key, value]) => value && key !== 'showAll')
      .map(([key]) => key);

    const categories =
      selectedCategories.length > 0 ? selectedCategories : null;

    const response = await getRoutesList(
      { categories, language: 'pt' },
      { signal }
    );

    const latLonList = response.data?.map(route => [route.lat, route.lon]);
    setBounds(boundWithMinimumArea(latLonList, 16));
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return <MapWithTracking bounds={bounds} mapLayers={mapLayers} showRoutes />;
};

ListMap.contextTypes = {
  config: configShape.isRequired
};

ListMap.propTypes = {
  location: locationShape.isRequired,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  ListMap,
  ['MapLayerStore', 'PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: 'routes' })
  })
);
