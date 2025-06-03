import React from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { matchShape } from 'found';
import { intlShape } from 'react-intl';
import MapWithTracking from '../../component/map/MapWithTracking';
import { sameLocations } from '../../util/path';
import { configShape, locationShape } from '../../util/shapes';
import { mapLayerShape } from '../../store/MapLayerStore';
import { isValidLocation } from '../../util/amporto/geo';

let focus = {};
const mwtProps = {};

const PageMap = (
  { location, match, origin, destination, mapLayers },
  { config }
) => {
  let newFocus = {};
  let zoom = 16;

  if (origin.lat) {
    newFocus = origin;
  } else if (destination.lat) {
    newFocus = destination;
  } else if (!match.params.from && !match.params.to) {
    newFocus = isValidLocation(location, config.coordinatesBounds)
      ? location
      : config.defaultEndpoint;
    zoom = config.defaultMapZoom;
  }

  if (!sameLocations(focus, newFocus) && newFocus.lat) {
    // feed in new props to map
    if (newFocus.type === 'CurrentLocation') {
      mwtProps.mapTracking = true;
    } else {
      mwtProps.mapTracking = false;
    }
    mwtProps.zoom = zoom;
    mwtProps.lat = newFocus.lat;
    mwtProps.lon = newFocus.lon;
    focus = { ...newFocus };
  } else {
    delete mwtProps.mapTracking;
  }

  return <MapWithTracking {...mwtProps} mapLayers={mapLayers} showExplore />;
};

PageMap.propTypes = {
  location: locationShape.isRequired,
  match: matchShape.isRequired,
  origin: locationShape,
  destination: locationShape,
  mapLayers: mapLayerShape.isRequired
};

PageMap.defaultProps = {
  origin: {},
  destination: {}
};

PageMap.contextTypes = {
  config: configShape.isRequired,
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default connectToStores(
  PageMap,
  ['PositionStore', 'OriginStore', 'DestinationStore', 'MapLayerStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
    origin: getStore('OriginStore').getOrigin(),
    destination: getStore('DestinationStore').getDestination(),
    mapLayers: getStore('MapLayerStore').getMapLayers()
  })
);
