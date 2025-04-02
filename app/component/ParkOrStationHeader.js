import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { FormattedMessage } from 'react-intl';
import { configShape } from '../util/shapes';
import StopCode from './StopCode';
import LazilyLoad, { importLazy } from './LazilyLoad';
import { getJson } from '../util/xhrPromise';
import getZoneId from '../util/zoneIconUtils';
import ZoneIcon from './ZoneIcon';
import { hasVehicleRentalCode } from '../util/vehicleRentalUtils';
import { getIdWithoutFeed } from '../util/feedScopedIdUtils';
import ShareButton from './amporto/share-button';

const modules = {
  FavouriteVehicleRentalStationContainer: () =>
    importLazy(import('./FavouriteVehicleRentalStationContainer'))
};
const ParkOrBikeStationHeader = ({ parkOrStation, parkType }, { config }) => {
  const [zoneId, setZoneId] = useState(undefined);
  useEffect(() => {
    const searchParams = {
      'point.lat': parkOrStation.lat,
      'point.lon': parkOrStation.lon,
      'boundary.circle.radius': 0.2,
      layers: 'address',
      size: 1,
      zones: 1
    };
    if (config.searchParams['boundary.country']) {
      searchParams['boundary.country'] =
        config.searchParams['boundary.country'];
    }

    getJson(config.URL.PELIAS_REVERSE_GEOCODER, searchParams).then(data => {
      if (data.features != null && data.features.length > 0) {
        const match = data.features[0].properties;
        const id = getZoneId(config, match.zones, data.zones);
        if (id) {
          setZoneId(id.toString().toLowerCase());
        }
      }
    });
  }, []);

  // eslint-disable-next-line no-unused-vars
  const { stationId } = parkOrStation;
  const parkHeaderId = parkType === 'bike' ? 'bike-park' : 'car-park';
  const isRentalStation = stationId;

  return (
    <div className="rental-bike">
      <div className="rental-bike-header-item title">
        <FormattedMessage
          id={isRentalStation ? 'citybike-station-no-id' : parkHeaderId}
        />
        {isRentalStation && hasVehicleRentalCode(stationId) && (
          <StopCode code={getIdWithoutFeed(stationId)} />
        )}
        {zoneId && (
          <span className="bike-station-zone-icon">
            <ZoneIcon zoneId={zoneId.toUpperCase()} />
          </span>
        )}
      </div>
      <div className="rental-bike-header-item share-and-favorite">
        {isRentalStation && (
          <>
            <ShareButton withBackground />
            <LazilyLoad modules={modules}>
              {({ FavouriteVehicleRentalStationContainer }) => (
                <FavouriteVehicleRentalStationContainer
                  vehicleRentalStation={parkOrStation}
                />
              )}
            </LazilyLoad>
          </>
        )}
      </div>
    </div>
  );
};

ParkOrBikeStationHeader.propTypes = {
  parkOrStation: PropTypes.shape({
    stationId: PropTypes.string,
    lat: PropTypes.number.isRequired,
    lon: PropTypes.number.isRequired
  }).isRequired,
  parkType: PropTypes.string
};

ParkOrBikeStationHeader.defaultProps = { parkType: undefined };

ParkOrBikeStationHeader.contextTypes = {
  config: configShape.isRequired
};

export default ParkOrBikeStationHeader;
