import React from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { matchShape } from 'found';
import { intlShape } from 'react-intl';
import MapWithTracking from './MapWithTracking';
import { sameLocations } from '../../util/path';
import LazilyLoad, { importLazy } from '../LazilyLoad';
import { configShape, locationShape } from '../../util/shapes';
import storeOrigin from '../../action/originActions';
import storeDestination from '../../action/destinationActions';
// eslint-disable-next-line import/no-named-as-default
import { mapLayerShape } from '../../store/MapLayerStore';
import { isValidLocation } from '../../util/amporto/geo';

const locationMarkerModules = {
  LocationMarker: () =>
    importLazy(import(/* webpackChunkName: "map" */ './LocationMarker'))
};

let focus = {};
const mwtProps = {};

function IndexPageMap(
  { location, match, origin, destination, mapLayers },
  { config, executeAction }
) {
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
    zoom = location?.hasLocation ? zoom : config.defaultMapZoom;
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

  const leafletObjs = [];

  if (origin.lat) {
    leafletObjs.push(
      <LazilyLoad modules={locationMarkerModules} key="from">
        {({ LocationMarker }) => (
          <LocationMarker position={origin} type="from" />
        )}
      </LazilyLoad>
    );
  }

  if (destination.lat) {
    leafletObjs.push(
      <LazilyLoad modules={locationMarkerModules} key="to">
        {({ LocationMarker }) => (
          <LocationMarker position={destination} type="to" />
        )}
      </LazilyLoad>
    );
  }

  const selectLocation = (item, id) => {
    if (id === 'origin') {
      executeAction(storeOrigin, item);
    } else {
      executeAction(storeDestination, item);
    }
  };

  return (
    <MapWithTracking
      {...mwtProps}
      mapLayers={mapLayers}
      leafletObjs={leafletObjs}
      locationPopup="origindestination"
      onSelectLocation={selectLocation}
      vehicles
    />
  );
}

IndexPageMap.propTypes = {
  location: locationShape.isRequired,
  match: matchShape.isRequired,
  origin: locationShape,
  destination: locationShape,
  mapLayers: mapLayerShape.isRequired
};

IndexPageMap.defaultProps = {
  origin: {},
  destination: {}
};

IndexPageMap.contextTypes = {
  config: configShape.isRequired,
  executeAction: PropTypes.func.isRequired,
  intl: intlShape.isRequired
};

export default connectToStores(
  IndexPageMap,
  ['PositionStore', 'OriginStore', 'DestinationStore', 'MapLayerStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
    origin: getStore('OriginStore').getOrigin(),
    destination: getStore('DestinationStore').getDestination(),
    mapLayers: getStore('MapLayerStore').getMapLayers()
  })
);
