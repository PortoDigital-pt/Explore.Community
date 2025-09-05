import React from 'react';
import { string } from 'prop-types';
import { FormattedMessage } from 'react-intl';
import { vehicleRentalStationShape } from '../util/shapes';

const VehicleRentalStation = ({ vehicleRentalStation, messageId }) => {
  return (
    <div className="rental-bike-content-container">
      <div className="row-bike">
        <div className="rental-bike-content-item label">
          <FormattedMessage id={`citybike-available-${messageId}`} />
        </div>
        <div className="rental-bike-content-item value">
          <span className="value-container">
            {vehicleRentalStation.availableVehicles.total || 0}
          </span>
        </div>
      </div>
    </div>
  );
};

VehicleRentalStation.propTypes = {
  vehicleRentalStation: vehicleRentalStationShape.isRequired,
  messageId: string.isRequired
};

export default VehicleRentalStation;
