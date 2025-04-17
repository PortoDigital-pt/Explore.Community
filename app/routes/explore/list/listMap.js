import React, { useMemo } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { locationShape, configShape } from '../../../util/shapes';
import { mapLayerShape } from '../../../store/MapLayerStore';
import MapWithTracking from '../../../component/map/MapWithTracking';
import { isValidLocation } from '../../../util/amporto/geo';

const ListMap = (
  { location, mapLayers },
  { config: { coordinatesBounds, defaultEndpoint } }
) => {
  const isValid = useMemo(
    () => isValidLocation(location, coordinatesBounds),
    [location]
  );

  return (
    <MapWithTracking
      zoom={17}
      lat={isValid ? location.lat : defaultEndpoint.lat}
      lon={isValid ? location.lon : defaultEndpoint.lon}
      mapLayers={mapLayers}
      showExplore
    />
  );
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
  ({ getStore }, { type }) => ({
    location: getStore('PositionStore').getLocationState(),
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: type })
  })
);
