import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { configShape } from '../util/shapes';
import StopPageMap from './map/StopPageMap';

const ScooterRentalStationMapContainer = ({
  vehicleRentalStation,
  isExplore = false
}) => {
  if (!vehicleRentalStation) {
    return false;
  }
  return (
    <StopPageMap stop={vehicleRentalStation} scooters isExplore={isExplore} />
  );
};

ScooterRentalStationMapContainer.contextTypes = {
  config: configShape.isRequired
};

ScooterRentalStationMapContainer.propTypes = {
  isExplore: PropTypes.bool,
  vehicleRentalStation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    name: PropTypes.string
  })
};

ScooterRentalStationMapContainer.defaultProps = {
  vehicleRentalStation: undefined
};

const containerComponent = createFragmentContainer(
  ScooterRentalStationMapContainer,
  {
    vehicleRentalStation: graphql`
      fragment ScooterRentalStationMapContainer_vehicleRentalStation on VehicleRentalStation {
        lat
        lon
        name
      }
    `
  }
);

export {
  containerComponent as default,
  ScooterRentalStationMapContainer as Component
};
