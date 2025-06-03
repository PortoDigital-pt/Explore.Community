import React, { useMemo } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { locationShape, configShape } from '../../../util/shapes';
import { mapLayerShape } from '../../../store/MapLayerStore';
import MapWithTracking from '../../../component/map/MapWithTracking';
import { isValidLocation } from '../../../util/amporto/geo';
import { boundWithMinimumArea } from '../../../util/geo-utils';

const mockBounds = [
  [41.16078345, -8.58273213],
  [41.149367, -8.622465],
  [41.1453047, -8.5907293],
  [41.14765395, -8.63292961],
  [41.144665, -8.581116],
  [41.1434381, -8.5730205],
];

const ListMap = (
  { location, mapLayers },
  { config: { coordinatesBounds, defaultEndpoint } },
) => {
  const isValid = useMemo(
    () => isValidLocation(location, coordinatesBounds),
    [location],
  );

  const bounds = boundWithMinimumArea(mockBounds, 17);

  return (
    <MapWithTracking
      // zoom={15}
      // lat={isValid ? location.lat : defaultEndpoint.lat}
      // lon={isValid ? location.lon : defaultEndpoint.lon}
      bounds={bounds}
      mapLayers={mapLayers}
      showExplore
    />
  );
};

ListMap.contextTypes = {
  config: configShape.isRequired,
};

ListMap.propTypes = {
  location: locationShape.isRequired,
  mapLayers: mapLayerShape.isRequired,
};

export default connectToStores(
  ListMap,
  ['MapLayerStore', 'PositionStore'],
  ({ getStore }, { type }) => ({
    location: getStore('PositionStore').getLocationState(),
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: type }),
  }),
);
