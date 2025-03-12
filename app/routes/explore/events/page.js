/* eslint-disable no-nested-ternary */
import React, { useEffect } from 'react';
import moment from 'moment';
import { string } from 'prop-types';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import BackButton from '../../../component/BackButton';
import Icon from '../../../component/Icon';
import { useSelectedEvent } from './useSelectedEvent';

const getPrice = ({ priceFrom, priceTo }) => {
  if (priceFrom && priceTo) {
    return `${priceFrom} - ${priceTo} €`;
  }

  return priceFrom || priceTo ? `${priceFrom ?? priceTo} €` : null;
};

const Page = ({ language, breakpoint }, { match, router, intl }) => {
  const { selectedEvent, error } = useSelectedEvent({ id: match.params.id });

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
      {breakpoint === 'large' && (
        <BackButton
          key={selectedEvent.id}
          title={selectedEvent.name}
          subtitle={selectedEvent.category}
        />
      )}
      <div className="image" />
      <div className="details">
        <div className="contacts">
          <div>
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
  breakpoint: string.isRequired
};

export default connectToStores(
  withBreakpoint(Page),
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
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
