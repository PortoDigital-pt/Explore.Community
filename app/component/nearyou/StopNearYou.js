import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useRouter } from 'found';
import { FormattedMessage, intlShape } from 'react-intl';
import connectToStores from 'fluxible-addons-react/connectToStores';
import Modal from '@hsl-fi/modal';
import {
  stopShape,
  configShape,
  relayShape,
  locationShape
} from '../../util/shapes';
import { hasEntitiesOfType } from '../../util/alertUtils';
import { PREFIX_STOPS, PREFIX_TERMINALS } from '../../util/path';
import { AlertEntityType } from '../../constants';
import StopNearYouHeader from './StopNearYouHeader';
import AlertBanner from '../AlertBanner';
import StopNearYouDepartureRowContainer from './StopNearYouDepartureRowContainer';
import CapacityModal from '../CapacityModal';
import { showDistance } from '../../util/amporto/geo';
import useDistanceToTarget from '../../hooks/useDistanceToTarget';
import { getItineraryPath } from '../../routes/explore/details/routes/util';

const StopNearYou = (
  { stop, desc, stopId, currentTime, currentMode, relay, location },
  { config, intl, executeAction }
) => {
  if (!stop.stoptimesWithoutPatterns) {
    return null;
  }
  const { router } = useRouter();
  const distanceToStop = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: stop
  });
  const [capacityModalOpen, setCapacityModalOpen] = useState(false);
  const stopMode = stop.stoptimesWithoutPatterns[0]?.trip.route.mode;
  useEffect(() => {
    let id = stop.gtfsId;
    if (stopId) {
      id = stopId;
    }
    if (currentMode === stopMode || !currentMode) {
      relay?.refetch(oldVariables => {
        return { ...oldVariables, stopId: id, startTime: currentTime };
      }, null);
    }
  }, [currentTime, currentMode]);
  const description = desc || stop.desc;
  const isStation = stop.locationType === 'STATION';
  const { gtfsId } = stop;
  const urlEncodedGtfsId = gtfsId.replace('/', '%2F');
  const linkAddress = isStation
    ? `/browse/${PREFIX_TERMINALS}/${urlEncodedGtfsId}`
    : `/browse/${PREFIX_STOPS}/${urlEncodedGtfsId}`;

  const { constantOperationStops } = config;
  const { locale } = intl;
  const isConstantOperation = constantOperationStops[stop.gtfsId];
  const filteredAlerts = stop.alerts.filter(alert =>
    hasEntitiesOfType(alert, AlertEntityType.Stop)
  );
  return (
    <span role="listitem">
      <div className="stop-near-you-container">
        <StopNearYouHeader
          stop={stop}
          desc={description}
          isStation={isStation}
          distance={
            !!distanceToStop &&
            `${intl.messages['at-distance']} ${showDistance(distanceToStop)}`
          }
        />
        <span className="sr-only">
          <FormattedMessage
            id="departure-list-update.sr-instructions"
            default="The departure list and estimated departure times will update in real time."
          />
        </span>
        {filteredAlerts.length > 0 && (
          <AlertBanner
            alerts={filteredAlerts}
            linkAddress={`${linkAddress}/hairiot`}
          />
        )}
        {isConstantOperation ? (
          <div className="stop-constant-operation-container bottom-margin">
            <div style={{ width: '85%' }}>
              <span>{constantOperationStops[stop.gtfsId][locale].text}</span>
              <span style={{ display: 'inline-block' }}>
                <a
                  href={constantOperationStops[stop.gtfsId][locale].link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {constantOperationStops[stop.gtfsId][locale].link}
                </a>
              </span>
            </div>
          </div>
        ) : (
          <>
            <StopNearYouDepartureRowContainer
              currentTime={currentTime}
              mode={stopMode}
              stopTimes={stop.stoptimesWithoutPatterns}
              isStation={isStation && stopMode !== 'SUBWAY'}
              setCapacityModalOpen={() => setCapacityModalOpen(true)}
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
                onClick={() => router.push(linkAddress)}
                aria-label={intl.messages.details}
              >
                {intl.messages.details}
              </button>
            </div>
          </>
        )}
      </div>
      <Modal
        appElement="#app"
        contentLabel="Capacity modal"
        closeButtonLabel="Close"
        variant="small"
        isOpen={capacityModalOpen}
        onCrossClick={() => setCapacityModalOpen(false)}
      >
        <CapacityModal config={config} />
      </Modal>
    </span>
  );
};

const connectedComponent = connectToStores(
  StopNearYou,
  ['TimeStore'],
  context => ({
    location: context.getStore('PositionStore').getLocationState(),
    currentTime: context.getStore('TimeStore').getCurrentTime()
  })
);

StopNearYou.propTypes = {
  stop: stopShape.isRequired,
  stopId: PropTypes.string,
  currentTime: PropTypes.number.isRequired,
  currentMode: PropTypes.string.isRequired,
  desc: PropTypes.string,
  relay: relayShape,
  location: locationShape.isRequired
};

StopNearYou.defaultProps = {
  stopId: undefined,
  desc: undefined,
  relay: undefined
};

StopNearYou.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired,
  executeAction: PropTypes.func.isRequired
};

export default connectedComponent;
