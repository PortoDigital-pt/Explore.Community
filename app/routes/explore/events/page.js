/* eslint-disable no-nested-ternary */
import React from 'react';
import moment from 'moment';
import { string, func, shape, number } from 'prop-types';
import { intlShape } from 'react-intl';
import Icon from '../../../component/Icon';
import { showDistance } from '../../../util/amporto/geo';
import { useSelectedEvent } from './useSelectedEvent';
import Details from '../../../component/amporto/pages/details';
import FavouriteExplore from '../../../component/FavouriteExploreContainer';

const getPrice = ({ priceFrom, priceTo }) => {
  if (priceFrom && priceTo) {
    return `${priceFrom} - ${priceTo} €`;
  }

  return priceFrom || priceTo ? `${priceFrom ?? priceTo} €` : null;
};

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

const MobileContent = ({ onDetails, intl, selectedData, distance }) => (
  <div className="mobile-view">
    <div className="header">
      <div className="top">
        <div className="title">
          <Icon
            img="icon-explore-icon_events_with_background"
            viewBox="0 0 44 44"
          />
          <h3>{selectedData.name}</h3>
        </div>
        <FavouriteExplore data={selectedData} />
      </div>
      <div className="distance">
        {distance &&
          `${intl.messages['at-distance']} ${showDistance(distance)}`}
      </div>
    </div>
    <div className="content">
      <div className="image" />
      <div className="details">
        <div className="contacts">
          <div className="category">{selectedData.category}</div>
          <div className="dates">
            <DateSection
              startDate={selectedData.startDate}
              endDate={selectedData.endDate}
            />
          </div>
          <div>
            <Icon img="icon-location" viewBox="0 0 16 16" />
            <p>{selectedData.address}</p>
          </div>
          <div>
            <Icon img="icon-cost" viewBox="0 0 16 16" />
            <p>{`${
              getPrice(selectedData) ?? intl.messages['free-of-charge']
            }`}</p>
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

MobileContent.propTypes = {
  onDetails: func.isRequired,
  intl: intlShape.isRequired,
  selectedData: shape().isRequired,
  distance: number
};

const PageContent = ({ selectedData, intl, link }) => (
  <>
    <div className="image" />
    <div className="details">
      <div className="contacts">
        <div className="dates">
          <DateSection
            startDate={selectedData.startDate}
            endDate={selectedData.endDate}
          />
        </div>
        <div>
          <Icon img="icon-location" viewBox="0 0 16 16" />
          <p>{selectedData.address}</p>
        </div>
        <div>
          <Icon img="icon-cost" viewBox="0 0 16 16" />
          <p>{`${
            getPrice(selectedData) ?? intl.messages['free-of-charge']
          }`}</p>
        </div>
      </div>
      <div className="description">
        <h3>{intl.messages.about}</h3>
        <p>{selectedData.description ?? 'No information at all'}</p>
        <a href={link} target="_blank" rel="noopener noreferrer">
          {intl.messages['know-more']}
        </a>
      </div>
    </div>
  </>
);

PageContent.propTypes = {
  selectedData: shape().isRequired,
  intl: intlShape.isRequired,
  link: string.isRequired
};

const EventDetailsPage = () => (
  <Details
    useSelectedData={useSelectedEvent}
    onErrorPath="/explore/events"
    PageContent={PageContent}
    MobileContent={MobileContent}
  />
);

export default EventDetailsPage;
