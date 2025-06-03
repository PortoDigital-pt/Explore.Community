import PropTypes from 'prop-types';
import React from 'react';
import { configShape } from '../../../util/shapes';
import TileLayerContainer from './TileLayerContainer';
import VehicleRentalStations from './VehicleRentalStations';
import TaxiRentalStations from './TaxiRentalStations';
import Stops from './Stops';
import ParkAndRideForCars from './ParkAndRideForCars';
import ParkAndRideForBikes from './ParkAndRideForBikes';
import { mapLayerShape } from '../../../store/MapLayerStore';
import RentalVehicles from './RentalVehicles';
import Explore from './Explore';
import Blocks from './Blocks';

export default function VectorTileLayerContainer(props, { config }) {
  const layers = [];

  if (props.mapLayers.stop) {
    layers.push(Stops);
  }

  if (props.mapLayers.taxis) {
    layers.push(TaxiRentalStations);
  }

  if (props.mapLayers.citybike) {
    layers.push(VehicleRentalStations);
  }

  if (props.mapLayers.parkAndRide) {
    layers.push(ParkAndRideForCars);
  }
  if (props.mapLayers.parkAndRideForBikes) {
    layers.push(ParkAndRideForBikes);
  }
  if (props.mapLayers.scooter) {
    layers.push(RentalVehicles);
  }

  if (props.showExplore) {
    layers.push(Explore);
  }

    if (props.showBlocks) {
    layers.push(Blocks);
  }

  return (
    <TileLayerContainer
      {...props}
      key="tileLayer"
      pane="markerPane"
      layers={layers}
      mapLayers={props.mapLayers}
      mergeStops={props.mergeStops}
      hilightedStops={props.hilightedStops}
      stopsToShow={props.stopsToShow}
      objectsToHide={props.objectsToHide}
      tileSize={config.map.tileSize || 256}
      zoomOffset={config.map.zoomOffset || 0}
      locationPopup={props.locationPopup}
      onSelectLocation={props.onSelectLocation}
    />
  );
}

VectorTileLayerContainer.propTypes = {
  mapLayers: mapLayerShape.isRequired,
  hilightedStops: PropTypes.arrayOf(PropTypes.string),
  stopsToShow: PropTypes.arrayOf(PropTypes.string),
  objectsToHide: PropTypes.objectOf(PropTypes.arrayOf(PropTypes.string)),
  mergeStops: PropTypes.bool,
  locationPopup: PropTypes.string,
  onSelectLocation: PropTypes.func,
  showExplore: PropTypes.bool,
  showBlocks: PropTypes.bool
};

VectorTileLayerContainer.defaultProps = {
  objectsToHide: { vehicleRentalStations: [] },
  hilightedStops: undefined,
  stopsToShow: undefined,
  mergeStops: false,
  onSelectLocation: undefined,
  locationPopup: undefined,
  showExplore: false,
  showBlocks: false
};

VectorTileLayerContainer.contextTypes = {
  config: configShape.isRequired
};
