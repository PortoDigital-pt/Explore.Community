/* eslint-disable no-nested-ternary */
import React, { useEffect, useMemo, Suspense, Fragment } from 'react';
import moment from 'moment';
import { string, func, shape, bool, number } from 'prop-types';
import distance from '@digitransit-search-util/digitransit-search-util-distance';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { locationShape } from '../../../util/shapes';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import BackButton from '../../../component/BackButton';
import Icon from '../../../component/Icon';
import ScrollableWrapper from '../../../component/ScrollableWrapper';
import { useSelectedEvent } from './useSelectedEvent';
import useModal from '../../../hooks/useModal';
import DetailsModal from '../modal';

const getPrice = ({ priceFrom, priceTo }) => {
  if (priceFrom && priceTo) {
    return `${priceFrom} - ${priceTo} €`;
  }

  return priceFrom || priceTo ? `${priceFrom ?? priceTo} €` : null;
};

const Page = ({ language, breakpoint, location }, { match, router, intl }) => {
  const { isOpen, open, close } = useModal();
  const { selectedEvent, error } = useSelectedEvent({ id: match.params.id });

  const distanceToEvent = useMemo(() => {
    if (!selectedEvent || !location.hasLocation) {
      return null;
    }

    return distance(selectedEvent, location);
  }, [location.hasLocation, selectedEvent]);

  useEffect(() => {
    if (error) {
      // force 404 page
      router.push('/explore/events');
    }
  }, [error, router.push]);

  if (!selectedEvent) {
    return <Loading />;
  }
  
  return (
    <section className="details-page">
      {breakpoint === 'large' ? (
        <Content selectedEvent={selectedEvent} intl={intl} />
      ) : (
        <MobileContent
          onDetails={open}
          selectedEvent={selectedEvent}
          intl={intl}
          distance={distanceToEvent}
        />
      )}
      {isOpen && (
        <Suspense fallback="">
          <DetailsModal isOpen={isOpen}>
            <Content
              selectedEvent={selectedEvent}
              intl={intl}
              onBackBtnClick={close}
              modal
            />
          </DetailsModal>
        </Suspense>
      )}
    </section>
  );
};

Page.contextTypes = {
  match: matchShape.isRequired,
  router: routerShape.isRequired,
  intl: intlShape.isRequired
};

Page.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired,
  location: locationShape.isRequired
};

export default connectToStores(
  withBreakpoint(Page),
  ['PreferencesStore', 'PositionStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    location: getStore('PositionStore').getLocationState()
  })
);

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

const MobileContent = ({ onDetails, intl, selectedEvent, distance }) => (
  <div className="mobile-view">
    <div className="header">
      <div className="top">
        <Icon
          img="icon-explore-icon_events_with_background"
          viewBox="0 0 44 44"
        />
        <h3>{selectedEvent.name}</h3>
      </div>
      <div className="distance">{distance && `${intl.messages['at-distance']} ${distance} m`}</div>
    </div>
    <div className="content">
      <div className="image" />
      <div className="details">
        <div className="contacts">
          <div className="category">{selectedEvent.category}</div>
          <div className="dates">
            <DateSection
              startDate={selectedEvent.startDate}
              endDate={selectedEvent.endDate}
            />
          </div>
          <div>
            <Icon img="icon-location" viewBox="0 0 16 16" />
            <p>{selectedEvent.address}</p>
          </div>
          <div>
            <Icon img="icon-cost" viewBox="0 0 16 16" />
            <p>{`${
              getPrice(selectedEvent) ?? intl.messages['free-of-charge']
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
  selectedEvent: shape().isRequired,
  distance: number
};

const Content = ({ selectedEvent, intl, onBackBtnClick, modal = false }) => {
  const Wrapper = modal ? ScrollableWrapper : Fragment;

  return (
    <>
      <BackButton
        key={selectedEvent.id}
        title={selectedEvent.name}
        subtitle={selectedEvent.category}
        onBackBtnClick={onBackBtnClick}
      />
      <Wrapper scrollable className="page">
        <div className="image" />
        <div className="details">
          <div className="contacts">
            <div className="dates">
              <DateSection
                startDate={selectedEvent.startDate}
                endDate={selectedEvent.endDate}
              />
            </div>
            <div>
              <Icon img="icon-location" viewBox="0 0 16 16" />
              <p>{selectedEvent.address}</p>
            </div>
            <div>
              <Icon img="icon-cost" viewBox="0 0 16 16" />
              <p>{`${
                getPrice(selectedEvent) ?? intl.messages['free-of-charge']
              }`}</p>
            </div>
          </div>
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <p>{selectedEvent.description ?? 'No information at all'}</p>
            <a
              href="https://www.agenda-porto.pt/"
              target="_blank"
              rel="noopener noreferrer"
            >
              {intl.messages['know-more']}
            </a>
          </div>
        </div>
      </Wrapper>
    </>
  );
};

Content.propTypes = {
  selectedEvent: shape().isRequired,
  intl: intlShape.isRequired,
  onBackBtnClick: func,
  modal: bool
};
