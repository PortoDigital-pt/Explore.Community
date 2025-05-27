import React from 'react';
import { func } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import useDistanceToTarget from '../../../../../hooks/useDistanceToTarget';
import { showDistance } from '../../../../../util/amporto/geo';
import Icon from '../../../../../component/Icon';
import { locationShape } from '../../../../../util/shapes';
import { poiShape } from '../../pois/page';

const Mobile = (
  { location, onDetails, selectedData, onStartItinerary },
  { intl, executeAction }
) => {
  const distanceToPoi = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  return (
    <div className="mobile-view">
      <div className="header">
        <div className="title">
          <Icon img="icon-circle" text={selectedData.position} />
          <h3 className="routes-tab">{selectedData.name}</h3>
        </div>

        <div className="distance">
          {!!distanceToPoi &&
            `${intl.messages['at-distance']} ${showDistance(distanceToPoi)}`}
        </div>
      </div>
      <div className="content">
        {selectedData.images && (
          <div className="image">
            <img
              src={selectedData.images[0]}
              alt={selectedData.name}
              loading="lazy"
            />
          </div>
        )}
        <div className="details">
          <div className="contacts">
            {selectedData.calendar && (
              <div>
                <Icon img="icon-time" viewBox="0 0 16 16" />
                <div className="schedule">
                  {selectedData.calendar.map(schedule => (
                    <p key={schedule}>{schedule}</p>
                  ))}
                </div>
              </div>
            )}
            {selectedData.address?.streetAddress && (
              <div>
                <Icon img="icon-location" viewBox="0 0 16 16" />
                <p>{`${selectedData.address.streetAddress}${
                  selectedData.address.streetNumber
                    ? `, ${selectedData.address.streetNumber}`
                    : ''
                }`}</p>
              </div>
            )}
            {selectedData.priceRange && (
              <div>
                <Icon img="icon-cost" viewBox="0 0 16 16" />
                <p>{intl.messages[`tickets-${selectedData.priceRange}`]}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="buttons">
        <button
          type="button"
          className="button-light"
          aria-label={intl.messages.details}
          onClick={() => onDetails()}
        >
          {intl.messages.details}
        </button>
        <button
          type="button"
          onClick={onStartItinerary}
          aria-label={intl.messages['start-here']}
        >
          {intl.messages['start-here']}
        </button>
      </div>
    </div>
  );
};

Mobile.propTypes = {
  onDetails: func.isRequired,
  selectedData: poiShape.isRequired,
  location: locationShape.isRequired,
  onStartItinerary: func.isRequired
};

Mobile.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

export const MobileContent = connectToStores(
  Mobile,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState()
  })
);
