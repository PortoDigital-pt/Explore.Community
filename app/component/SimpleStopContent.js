import React, { useEffect } from 'react';
import { number, string, func } from 'prop-types';
import { createRefetchContainer, graphql } from 'react-relay';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { FormattedMessage, intlShape } from 'react-intl';
import { routerShape, RedirectException } from 'found';
import {
  stopShape,
  errorShape,
  locationShape,
  relayShape
} from '../util/shapes';
import Icon from './Icon';
import { isBrowser } from '../util/browser';
import withBreakpoint from '../util/withBreakpoint';
import { showDistance } from '../util/amporto/geo';
import useDistanceToTarget from '../hooks/useDistanceToTarget';
import { getItineraryPath } from '../routes/explore/details/routes/util';
import LazilyLoad, { importLazy } from './LazilyLoad';
import ShareButton from './amporto/share-button';
import DepartureListContainer from './DepartureListContainer';

const modules = {
  FavouriteStopContainer: () => importLazy(import('./FavouriteStopContainer'))
};

const SimpleStopContent = (
  { stop, language, breakpoint, router, error, location, relay, currentTime },
  { intl, executeAction }
) => {
  const distanceToStop = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: stop
  });

  useEffect(() => {
    if (relay && currentTime) {
      relay.refetch(oldVariables => ({
        ...oldVariables,
        startTime: currentTime
      }));
    }
  }, [currentTime, relay]);

  if (!stop && !error) {
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
          <Icon
            img={`icon-icon_${stop.vehicleMode.toLowerCase()}_with_background`}
            viewBox="0 0 50 50"
          />

          <div className="rental-bike">
            <div className="rental-bike-header-item title">
              {`${
                language === 'pt'
                  ? `${intl.messages.stop} ${stop.name}`
                  : `${stop.name} ${intl.messages.stop}`
              }`}
            </div>
            <div className="rental-bike-header-item share-and-favorite">
              <ShareButton withBackground />
              <LazilyLoad modules={modules}>
                {({ FavouriteStopContainer }) => (
                  <FavouriteStopContainer stop={stop} />
                )}
              </LazilyLoad>
            </div>
          </div>
        </div>

        {stop.code && (
          <div className="row-bike">
            <div className="rental-bike">
              <span className="itinerary-stop-code">{stop.code}</span>
            </div>
          </div>
        )}

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
          onClick={() => router.push(getItineraryPath(location, stop))}
        >
          {intl.messages.directions}
        </button>
        <button
          type="button"
          onClick={() =>
            router.push(`/browse/stops/${encodeURIComponent(stop.gtfsId)}`)
          }
          aria-label={intl.messages.details}
        >
          {intl.messages.details}
        </button>
      </div>

      {stop.stoptimes?.length > 0 ? (
        <DepartureListContainer
          stoptimes={stop.stoptimes}
          key="departures"
          className="stop-page"
          currentTime={currentTime}
          showVehicles
        />
      ) : (
        <div className="stop-no-departures-container">
          <Icon img="icon-icon_station" />
          <FormattedMessage id="no-departures" defaultMessage="No departures" />
        </div>
      )}
    </div>
  );
};

SimpleStopContent.propTypes = {
  stop: stopShape.isRequired,
  language: string.isRequired,
  breakpoint: string.isRequired,
  router: routerShape.isRequired,
  error: errorShape,
  location: locationShape.isRequired,
  relay: relayShape.isRequired,
  currentTime: number.isRequired
};

SimpleStopContent.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

const connectedComponent = connectToStores(
  withBreakpoint(SimpleStopContent),
  ['PreferencesStore', 'PositionStore', 'TimeStore'],
  context => ({
    language: context.getStore('PreferencesStore').getLanguage(),
    location: context.getStore('PositionStore').getLocationState(),
    currentTime: context.getStore('TimeStore').getCurrentTime()
  })
);

export default createRefetchContainer(
  connectedComponent,
  {
    stop: graphql`
      fragment SimpleStopContent_stop on Stop
      @argumentDefinitions(
        startTime: { type: "Long!", defaultValue: 0 }
        timeRange: { type: "Int!", defaultValue: 864000 }
        numberOfDepartures: { type: "Int!", defaultValue: 5 }
      ) {
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
        url
        stoptimes: stoptimesWithoutPatterns(
          startTime: $startTime
          timeRange: $timeRange
          numberOfDepartures: $numberOfDepartures
          omitCanceled: false
        ) {
          ...DepartureListContainer_stoptimes
        }
      }
    `
  },
  graphql`
    query SimpleStopContentQuery(
      $id: String!
      $startTime: Long!
      $timeRange: Int!
      $numberOfDepartures: Int!
    ) {
      stop(id: $id) {
        ...SimpleStopContent_stop
          @arguments(
            startTime: $startTime
            timeRange: $timeRange
            numberOfDepartures: $numberOfDepartures
          )
      }
    }
  `
);
