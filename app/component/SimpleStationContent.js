import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { createFragmentContainer, graphql } from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage, intlShape } from 'react-intl';
import { routerShape, RedirectException } from 'found';
import { stopShape, errorShape, locationShape } from '../util/shapes';
import Icon from './Icon';
import withBreakpoint from '../util/withBreakpoint';
import { isBrowser } from '../util/browser';
import { showDistance } from '../util/amporto/geo';
import useDistanceToTarget from '../hooks/useDistanceToTarget';
import { getItineraryPath } from '../routes/explore/details/routes/util';
import LazilyLoad, { importLazy } from './LazilyLoad';
import ShareButton from './amporto/share-button';

const modules = {
  FavouriteStopContainer: () => importLazy(import('./FavouriteStopContainer'))
};

const SimpleStationContent = (
  { station, breakpoint, router, error, location },
  { intl, executeAction }
) => {
  const [client, setClient] = useState(false);
  const distanceToStop = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: station
  });

  useEffect(() => {
    // To prevent SSR from rendering something https://reactjs.org/docs/react-dom.html#hydrate
    setClient(true);
  });

  // throw error in client side relay query fails
  if (client && error && !station) {
    throw error.message;
  }

  if (!station && !error) {
    if (isBrowser) {
      router.replace('/');
    } else {
      throw new RedirectException('/');
    }
    return null;
  }

  return (
    <div className="bike-station-page-container">
      <div className="rental-bike-header-container">
        <div className="row-bike">
          <Icon img="icon-icon_subway_with_background" viewBox="0 0 50 50" />

          <div className="rental-bike">
            <div className="rental-bike-header-item title">
              <FormattedMessage id="subway-station" />
            </div>
            <div className="rental-bike-header-item share-and-favorite">
              <ShareButton withBackground />
              <LazilyLoad modules={modules}>
                {({ FavouriteStopContainer }) => (
                  <FavouriteStopContainer stop={station} isTerminal />
                )}
              </LazilyLoad>
            </div>
          </div>
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

      <div className="buttons">
        <button
          type="button"
          className="button-light"
          aria-label={intl.messages.directions}
          onClick={() => router.push(getItineraryPath(location, station))}
        >
          {intl.messages.directions}
        </button>
        <button
          type="button"
          onClick={() =>
            router.push(
              `/browse/terminals/${encodeURIComponent(station.gtfsId)}`
            )
          }
          aria-label={intl.messages.details}
        >
          {intl.messages.details}
        </button>
      </div>
    </div>
  );
};

SimpleStationContent.propTypes = {
  station: stopShape.isRequired,
  breakpoint: PropTypes.string.isRequired,
  router: routerShape.isRequired,
  error: errorShape,
  location: locationShape.isRequired
};

SimpleStationContent.defaultProps = {
  error: undefined
};

SimpleStationContent.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: PropTypes.func.isRequired
};

const SimpleStationContentWithBreakpoint = withBreakpoint(SimpleStationContent);

const connectedComponent = connectToStores(
  SimpleStationContentWithBreakpoint,
  ['PositionStore'],
  context => ({
    location: context.getStore('PositionStore').getLocationState()
  })
);

const containerComponent = createFragmentContainer(connectedComponent, {
  station: graphql`
    fragment SimpleStationContent_station on Stop {
      id
      gtfsId
      lat
      lon
      platformCode
      name
      code
      desc
      vehicleMode
      locationType
    }
  `
});

export {
  containerComponent as default,
  SimpleStationContentWithBreakpoint as Component
};
