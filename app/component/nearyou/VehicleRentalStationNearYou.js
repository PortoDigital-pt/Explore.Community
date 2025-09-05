import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage, intlShape } from 'react-intl';
import { useRouter } from 'found';
import { graphql, createRefetchContainer } from 'react-relay';
import VehicleRentalStation from '../VehicleRentalStation';
import {
  PREFIX_BIKESTATIONS,
  PREFIX_TAXISTATIONS,
  PREFIX_SCOOTERSTATIONS
} from '../../util/path';
import { hasVehicleRentalCode } from '../../util/vehicleRentalUtils';
import { getIdWithoutFeed } from '../../util/feedScopedIdUtils';
import { relayShape, locationShape } from '../../util/shapes';
import Icon from '../Icon';
import { showDistance } from '../../util/amporto/geo';
import useDistanceToTarget from '../../hooks/useDistanceToTarget';
import { getItineraryPath } from '../../routes/explore/details/routes/util';

const networkPrefix = {
  taxis: PREFIX_TAXISTATIONS,
  smoove: PREFIX_BIKESTATIONS,
  scooters: PREFIX_SCOOTERSTATIONS
};

const networkIcon = {
  taxis: 'taxis',
  smoove: 'citybike',
  scooters: 'scooters'
};

const networkMessage = {
  taxis: 'taxis-station',
  smoove: 'citybike-station',
  scooters: 'scooters-station'
};

const networkTranslation = {
  taxis: 'taxis',
  smoove: 'bicycles',
  scooters: 'scooters'
};

const VehicleRentalStationNearYou = (
  { stop, relay, currentTime, currentMode, location },
  { intl, executeAction }
) => {
  const { router } = useRouter();
  const distanceToStop = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: stop
  });

  useEffect(() => {
    const { stationId } = stop;
    if (currentMode === 'CITYBIKE') {
      relay?.refetch(
        oldVariables => {
          return { ...oldVariables, stopId: stationId };
        },
        null,
        null,
        { force: true } // query variables stay the same between refetches
      );
    }
  }, [currentTime]);

  return (
    <span role="listitem">
      <div className="stop-near-you-container">
        <div className="stop-near-you-header-container">
          <Icon
            img={`icon-icon_${networkIcon[stop.rentalNetwork.networkId]}`}
            viewBox="0 0 50 50"
          />
          <div className="stop-header-content">
            <div className="stop-near-you-name">
              <FormattedMessage
                id={networkMessage[stop.rentalNetwork.networkId]}
                values={{
                  stationId: hasVehicleRentalCode(stop.stationId)
                    ? getIdWithoutFeed(stop.stationId)
                    : ''
                }}
              />
            </div>
          </div>
          {!!distanceToStop && (
            <div className="distance">{`${
              intl.messages['at-distance']
            } ${showDistance(distanceToStop)}`}</div>
          )}
        </div>
        <VehicleRentalStation
          vehicleRentalStation={stop}
          messageId={networkTranslation[stop.rentalNetwork.networkId]}
        />
        <div className="buttons">
          <button
            type="button"
            className="button-light"
            aria-label={intl.messages.directions}
            onClick={() => router.push(getItineraryPath(location, stop))}
          >
            {intl.messages.directions}
          </button>
          <button
            type="button"
            onClick={() =>
              router.push(
                `/browse/${networkPrefix[stop.rentalNetwork.networkId]}/${
                  stop.stationId
                }`
              )
            }
            aria-label={intl.messages.details}
          >
            {intl.messages.details}
          </button>
        </div>
      </div>
    </span>
  );
};
VehicleRentalStationNearYou.propTypes = {
  stop: PropTypes.shape({
    capacity: PropTypes.number,
    distance: PropTypes.number,
    lat: PropTypes.number,
    lon: PropTypes.number,
    name: PropTypes.string,
    rentalNetwork: PropTypes.shape({
      networkId: PropTypes.string
    }),
    operative: PropTypes.bool,
    stationId: PropTypes.string,
    type: PropTypes.string,
    availableVehicles: PropTypes.shape({ total: PropTypes.number }),
    availableSpaces: PropTypes.shape({ total: PropTypes.number })
  }).isRequired,
  currentTime: PropTypes.number,
  currentMode: PropTypes.string,
  relay: relayShape.isRequired,
  location: locationShape.isRequired
};

VehicleRentalStationNearYou.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: PropTypes.func.isRequired
};

VehicleRentalStationNearYou.defaultProps = {
  currentTime: undefined,
  currentMode: undefined
};

export default createRefetchContainer(
  connectToStores(VehicleRentalStationNearYou, ['PositionStore'], context => ({
    location: context.getStore('PositionStore').getLocationState()
  })),
  {
    stop: graphql`
      fragment VehicleRentalStationNearYou_stop on VehicleRentalStation {
        stationId
        name
        availableVehicles {
          total
        }
        availableSpaces {
          total
        }
        capacity
        rentalNetwork {
          networkId
        }
        operative
      }
    `
  },
  graphql`
    query VehicleRentalStationNearYouRefetchQuery($stopId: String!) {
      vehicleRentalStation(id: $stopId) {
        ...VehicleRentalStationNearYou_stop
      }
    }
  `
);
