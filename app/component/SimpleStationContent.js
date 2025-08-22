import React, { useState, useEffect } from 'react';
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

const SimpleStationContent = (
  {
    station,
    language,
    breakpoint,
    router,
    error,
    location,
    relay,
    currentTime
  },
  { intl, executeAction }
) => {
  const [client, setClient] = useState(false);
  const distanceToStop = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: station
  });

  useEffect(() => {
    setClient(true);
  }, []);

  useEffect(() => {
    if (relay && currentTime) {
      relay.refetch(oldVariables => ({ ...oldVariables, startTime: currentTime }));
    }
  }, [currentTime, relay]);

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
              {`${
                language === 'pt'
                  ? `${intl.messages.station} ${station.name}`
                  : `${station.name} ${intl.messages.station}`
              }`}
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

      {station.stoptimes?.length > 0 ? (
        <DepartureListContainer
          mode="SUBWAY"
          stoptimes={station.stoptimes}
          key="departures"
          className="stop-page"
          currentTime={currentTime}
          isTerminal
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

SimpleStationContent.propTypes = {
  station: stopShape.isRequired,
  language: string.isRequired,
  breakpoint: string.isRequired,
  router: routerShape.isRequired,
  error: errorShape,
  location: locationShape.isRequired,
  relay: relayShape.isRequired,
  currentTime: number.isRequired
};

SimpleStationContent.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

const connectedComponent = connectToStores(
  withBreakpoint(SimpleStationContent),
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
    station: graphql`
      fragment SimpleStationContent_station on Stop
      @argumentDefinitions(
        startTime: { type: "Long!", defaultValue: 0 }
        timeRange: { type: "Int!", defaultValue: 43200 }
        numberOfDepartures: { type: "Int!", defaultValue: 5 }
      ) {
        gtfsId
        lat
        lon
        name
        stops {
          patterns {
            route {
              mode
            }
          }
        }
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
    query SimpleStationContentContainerQuery(
      $id: String!
      $startTime: Long!
      $timeRange: Int!
      $numberOfDepartures: Int!
    ) {
      station(id: $id) {
        ...SimpleStationContent_station
          @arguments(
            startTime: $startTime
            timeRange: $timeRange
            numberOfDepartures: $numberOfDepartures
          )
      }
    }
  `
);
