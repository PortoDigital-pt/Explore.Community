/* eslint-disable compat/compat */
import React, { useEffect, useState } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { string } from 'prop-types';
import { boundWithMinimumArea } from '../../../../util/geo-utils';
import MapWithTracking from '../../../../component/map/MapWithTracking';
import { configShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import { getRoutesList } from '../../../../util/amporto/api';

const ListMap = ({ mapLayers, language }, { config }) => {
  const [bounds, setBounds] = useState([]);

  const getRoutes = async () => {
    const controller = new AbortController();
    const { signal } = controller;

    const selectedCategories = Object.entries(mapLayers.routes)
      .filter(([key, value]) => value && key !== 'showAll')
      .map(([key]) => key);

    const categories =
      selectedCategories.length > 0 ? selectedCategories : null;

    const response = await getRoutesList({ categories, language }, { signal });

    const latLonList = response.data?.map(route => [route.lat, route.lon]);
    setBounds(boundWithMinimumArea(latLonList, config.defaultMapZoom));
  };

  useEffect(() => {
    getRoutes();
  }, []);

  return (
    <MapWithTracking
      bounds={bounds}
      mapLayers={mapLayers}
      showRoutes
      ignoreMinZoom
    />
  );
};

ListMap.contextTypes = {
  config: configShape.isRequired
};

ListMap.propTypes = {
  mapLayers: mapLayerShape.isRequired,
  language: string.isRequired
};

export default connectToStores(
  ListMap,
  ['MapLayerStore', 'PreferencesStore'],
  ({ getStore }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: 'routes' }),
    language: getStore('PreferencesStore').getLanguage()
  })
);
