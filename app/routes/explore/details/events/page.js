import React from 'react';
import moment from 'moment';
import classname from 'classnames';
import { string, func, shape, bool } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { locationShape } from '../../../../util/shapes';
import Icon from '../../../../component/Icon';
import { showDistance } from '../../../../util/amporto/geo';
import { getEventById } from '../../../../util/amporto/api';
import Details from '../details';
import FavouriteExplore from '../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../component/amporto/share-button';
import ImageSlider from '../../../../component/amporto/image-slider';
import useDistanceToTarget from '../../../../hooks/useDistanceToTarget';

const DateSection = ({ startDate, endDate }) => {
  const start = moment(startDate);
  const end = moment(endDate);

  const startDay = start.format('D MMM');
  const endDay = end.format('D MMM');
  const startTime =
    start.isValid() && start.format('HH:mm') !== '00:00'
      ? start.format('HH[h]')
      : null;
  const endTime =
    end.isValid() && end.format('HH:mm') !== '00:00'
      ? end.format('HH[h]')
      : null;

  const date =
    startDay === endDay
      ? startDay
      : startDay && endDay
        ? `${startDay} - ${endDay}`
        : startDay ?? endDay;
  const time =
    startTime === endTime
      ? startTime
      : startTime && endTime
        ? `${startTime} - ${endTime}`
        : startTime ?? endTime;

  return (
    <>
      {date && (
        <div>
          <Icon img="icon-calendar" viewBox="0 0 16 16" />
          <p>{date}</p>
        </div>
      )}
      {time && (
        <div>
          <Icon img="icon-time" viewBox="0 0 16 16" />
          <p>{time}</p>
        </div>
      )}
    </>
  );
};

DateSection.propTypes = {
  startDate: string,
  endDate: string
};

const Mobile = (
  { location, onDetails, selectedData, showShare = false, innerRef },
  { intl, executeAction }
) => {
  const distanceToEvent = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  return (
    <div className="mobile-view" ref={innerRef}>
      <div className="header">
        <div className="top">
          <div className="title">
            <Icon
              img="icon-explore-icon_events_with_background"
              viewBox="0 0 44 44"
            />
            <h3>{selectedData.name}</h3>
          </div>
          {showShare && <ShareButton withBackground />}
          <FavouriteExplore data={selectedData} />
        </div>
        <div className="distance">
          {!!distanceToEvent &&
            `${intl.messages['at-distance']} ${showDistance(distanceToEvent)}`}
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
            <div className="categories">
              {Array.isArray(selectedData.category) ? (
                selectedData.category.map(category => (
                  <div key={category} className="category">
                    {category}
                  </div>
                ))
              ) : (
                <div className="category">{selectedData.category}</div>
              )}
            </div>
            <div className="dates">
              <DateSection
                startDate={selectedData.startDate}
                endDate={selectedData.endDate}
              />
            </div>
            <div>
              <Icon img="icon-location" viewBox="0 0 16 16" />
              <p>{`${selectedData.address.streetAddress}${
                selectedData.address.streetNumber
                  ? `, ${selectedData.address.streetNumber}`
                  : ''
              }`}</p>
            </div>
            <div>
              {selectedData.price && (
                <>
                  <Icon img="icon-cost" viewBox="0 0 16 16" />
                  <p>{`${
                    selectedData.price === '0'
                      ? intl.messages['free-of-charge']
                      : selectedData.price
                  }`}</p>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bottom">
        <button
          type="button"
          onClick={onDetails}
          aria-label={intl.messages.details}
        >
          {intl.messages.details}
        </button>
      </div>
    </div>
  );
};

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: shape().isRequired,
  location: locationShape.isRequired,
  showShare: bool
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

export const EventContactDetails = ({ selectedData }, { intl }) => (
  <div className="contacts">
    <div className="dates">
      <DateSection
        startDate={selectedData.startDate}
        endDate={selectedData.endDate}
      />
    </div>
    <div>
      <Icon img="icon-location" viewBox="0 0 16 16" />
      <p>{`${selectedData.address.streetAddress}${
        selectedData.address.streetNumber
          ? `, ${selectedData.address.streetNumber}`
          : ''
      }`}</p>
    </div>
    <div>
      {selectedData.price && (
        <>
          <Icon img="icon-cost" viewBox="0 0 16 16" />
          <p>{`${
            selectedData.price === '0'
              ? intl.messages['free-of-charge']
              : selectedData.price
          }`}</p>
        </>
      )}
    </div>
  </div>
);

EventContactDetails.propTypes = {
  selectedData: shape().isRequired
};

EventContactDetails.contextTypes = {
  intl: intlShape.isRequired
};

export const PageContent = ({ selectedData }, { intl }) => (
  <>
    {selectedData.images && (
      <div className="image">
        <ImageSlider images={selectedData.images} name={selectedData.name} />
      </div>
    )}
    <div
      className={classname('details', { lower: selectedData.images === null })}
    >
      <EventContactDetails selectedData={selectedData} />
      <div className="description">
        <h3>{intl.messages.about}</h3>
        {selectedData.description && <p>{selectedData.description}</p>}
        <a
          href={selectedData.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.messages['know-more']}
        </a>
      </div>
    </div>
  </>
);

PageContent.propTypes = {
  selectedData: shape().isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};

const EventDetailsPage = () => (
  <Details
    getDataById={getEventById}
    onErrorPath="/explore/events"
    PageContent={PageContent}
    MobileContent={MobileContent}
  />
);

export default EventDetailsPage;
