import PropTypes from 'prop-types';
import React from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import { configShape } from '../util/shapes';
import StopPageMap from './map/StopPageMap';

const TaxiRentalStationMapContainer = ({
  vehicleRentalStation,
  isExplore = false
}) => {
  if (!vehicleRentalStation) {
    return false;
  }
  return (
    <StopPageMap stop={vehicleRentalStation} taxis isExplore={isExplore} />
  );
};

TaxiRentalStationMapContainer.contextTypes = {
  config: configShape.isRequired
};

TaxiRentalStationMapContainer.propTypes = {
  isExplore: PropTypes.bool,
  vehicleRentalStation: PropTypes.shape({
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired,
    name: PropTypes.string
  })
};

TaxiRentalStationMapContainer.defaultProps = {
  vehicleRentalStation: undefined
};

const containerComponent = createFragmentContainer(
  TaxiRentalStationMapContainer,
  {
    vehicleRentalStation: graphql`
      fragment TaxiRentalStationMapContainer_vehicleRentalStation on VehicleRentalStation {
        lat
        lon
        name
      }
    `
  }
);

export {
  containerComponent as default,
  TaxiRentalStationMapContainer as Component
};
