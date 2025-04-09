import React from 'react';
import PropTypes from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { matchShape } from 'found';
import { intlShape } from 'react-intl';
import MapWithTracking from '../../component/map/MapWithTracking';
import { sameLocations } from '../../util/path';
import LazilyLoad, { importLazy } from '../../component/LazilyLoad';
import { configShape, locationShape } from '../../util/shapes';
import storeOrigin from '../../action/originActions';
import storeDestination from '../../action/destinationActions';
import { mapLayerShape } from '../../store/MapLayerStore';
import { isValidLocation } from '../../util/amporto/geo';

const locationMarkerModules = {
  LocationMarker: () =>
    importLazy(
      import(/* webpackChunkName: "map" */ '../../component/map/LocationMarker')
    )
};

let focus = {};
const mwtProps = {};

const PageMap = (
  { location, match, origin, destination, mapLayers },
  { config, executeAction }
) => {
  let newFocus = {};
  let zoom = 16;

  if (origin.lat) {
    newFocus = origin;
  } else if (destination.lat) {
    newFocus = destination;
  } else if (!match.params.from && !match.params.to) {
    const isValid = isValidLocation(location, config.coordinatesBounds)
    newFocus = isValid ? location : config.defaultEndpoint;
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
      showExplore
    />
  );
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
