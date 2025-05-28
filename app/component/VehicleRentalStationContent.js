import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage, intlShape } from 'react-intl';
import { routerShape, RedirectException } from 'found';
import {
  configShape,
  vehicleRentalStationShape,
  errorShape,
  locationShape
} from '../util/shapes';
import ParkOrStationHeader from './ParkOrStationHeader';
import Icon from './Icon';
import withBreakpoint from '../util/withBreakpoint';
import { getRentalNetworkConfig } from '../util/vehicleRentalUtils';
import { isBrowser } from '../util/browser';
import { showDistance } from '../util/amporto/geo';
import { getSmooveById } from '../util/amporto/api';
import { PREFIX_BIKESTATIONS } from '../util/path';
import { TransportMode } from '../constants';
import useDistanceToTarget from '../hooks/useDistanceToTarget';

const VehicleRentalStationContent = (
  { vehicleRentalStation, breakpoint, language, router, error, location },
  { config, intl, executeAction }
) => {
  const [client, setClient] = useState(false);
  const [smooveDetails, setSmooveDetails] = useState(null);
  const distanceToStop = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: vehicleRentalStation
  });

  useEffect(() => {
    // To prevent SSR from rendering something https://reactjs.org/docs/react-dom.html#hydrate
    setClient(true);
  });

  useEffect(() => {
    if (!vehicleRentalStation) {
      return;
    }

    const controller = new AbortController();
    const { signal } = controller;

    getSmooveById(vehicleRentalStation.stationId.split('smoove:')[1], {
      signal
    })
      .then(setSmooveDetails);

    return () => controller.abort();
  }, [vehicleRentalStation]);

  // throw error in client side relay query fails
  if (client && error && !vehicleRentalStation) {
    throw error.message;
  }

  if (!vehicleRentalStation && !error) {
    if (isBrowser) {
      router.replace(`/browse/${PREFIX_BIKESTATIONS}`);
    } else {
      throw new RedirectException(`/browse/${PREFIX_BIKESTATIONS}`);
    }
    return null;
  }
  const { availableVehicles, capacity } = vehicleRentalStation;
  const vehiclesAvailable = availableVehicles.total;
  const isFull = vehiclesAvailable >= capacity;

  const networkConfig = getRentalNetworkConfig(
    vehicleRentalStation.rentalNetwork.networkId,
    config
  );
  const cityBikeNetworkUrl = networkConfig?.url?.[language];
  let returnInstructionsUrl;
  if (networkConfig.returnInstructions) {
    returnInstructionsUrl = networkConfig.returnInstructions[language];
  }
  const { vehicleRental } = config;
  const cityBikeBuyUrl = vehicleRental.buyUrl?.[language];
  const buyInstructions = cityBikeBuyUrl
    ? vehicleRental.buyInstructions?.[language]
    : undefined;

  return (
    <div className="bike-station-page-container">
      <div className="rental-bike-header-container">
        <div className="row-bike">
          <Icon img="icon-icon_citybike" viewBox="0 0 50 50" />

          <ParkOrStationHeader parkOrStation={vehicleRentalStation} />
        </div>

        <div className="row-bike">
          <div className="rental-bike">
            <div className="rental-bike-header-item distance">
              {breakpoint !== 'large' &&
                !!distanceToStop &&
                `${intl.messages['at-distance']} ${showDistance(
                  distanceToStop
                )}`}
            </div>
          </div>
        </div>
      </div>

      <div className="rental-bike-content-container">
        <div className="row-bike">
          <div className="rental-bike-content-item label">
            <FormattedMessage id="citybike-available-bicycles" />
          </div>
          <div className="rental-bike-content-item value">
            <span className="value-container">
              {smooveDetails?.bicycles ?? 0}
            </span>
          </div>
        </div>
        <div className="row-bike">
          <div className="rental-bike-content-item label">
            <FormattedMessage id="citybike-available-scooters" />
          </div>
          <div className="rental-bike-content-item value">
            <span className="value-container">
              {smooveDetails?.scooters ?? 0}
            </span>
          </div>
        </div>
      </div>

      <div className="rental-bike-button-container">
        <div className="rental-bike-btn-item" style={{ display: 'none' }}>
          <a href="#future-link-here">Direções</a>
        </div>

        <div className="rental-bike-btn-item">
          {networkConfig.type === TransportMode.Citybike.toLowerCase() &&
            (cityBikeBuyUrl || cityBikeNetworkUrl) && (
              <div className="citybike-use-disclaimer">
                <h2 className="disclaimer-header">
                  <FormattedMessage id="citybike-start-using" />
                </h2>
                <div className="disclaimer-content">
                  {buyInstructions || (
                    <a
                      className="external-link-citybike"
                      href={cityBikeNetworkUrl}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <FormattedMessage id="citybike-start-using-info" />
                    </a>
                  )}
                </div>
                {client && cityBikeBuyUrl && (
                  <a
                    onClick={e => {
                      e.stopPropagation();
                    }}
                    className="external-link"
                    href={cityBikeBuyUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <FormattedMessage id="citybike-purchase-link" />
                    <Icon img="icon-icon_external-link-box" />
                  </a>
                )}
              </div>
            )}
        </div>
      </div>

      {vehicleRental.showFullInfo && isFull && (
        <div className="citybike-full-station-guide">
          <FormattedMessage id="citybike-return-full" />
          <a
            onClick={e => {
              e.stopPropagation();
            }}
            className="external-link-citybike"
            href={returnInstructionsUrl}
            target="_blank"
            rel="noreferrer"
          >
            {' '}
            <FormattedMessage id="citybike-return-full-link" />
          </a>
        </div>
      )}
    </div>
  );
};

VehicleRentalStationContent.propTypes = {
  vehicleRentalStation: vehicleRentalStationShape.isRequired,
  breakpoint: PropTypes.string.isRequired,
  language: PropTypes.string.isRequired,
  router: routerShape.isRequired,
  error: errorShape,
  location: locationShape.isRequired
};

VehicleRentalStationContent.defaultProps = {
  error: undefined
};

VehicleRentalStationContent.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired,
  executeAction: PropTypes.func.isRequired
};

const VehicleRentalStationContentWithBreakpoint = withBreakpoint(
  VehicleRentalStationContent
);

const connectedComponent = connectToStores(
  VehicleRentalStationContentWithBreakpoint,
  ['PreferencesStore', 'PositionStore'],
  context => ({
    language: context.getStore('PreferencesStore').getLanguage(),
    location: context.getStore('PositionStore').getLocationState()
  })
);

const containerComponent = createFragmentContainer(connectedComponent, {
  vehicleRentalStation: graphql`
    fragment VehicleRentalStationContent_vehicleRentalStation on VehicleRentalStation {
      lat
      lon
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
      stationId
      operative
    }
  `
});

export {
  containerComponent as default,
  VehicleRentalStationContentWithBreakpoint as Component
};
