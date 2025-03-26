import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import { locationShape } from '../../../../util/shapes';
import Skeleton from '../../../../component/amporto/skeleton';
import Card from '../../../../component/amporto/card';
import { useEventsList } from './useEventsList';
// TODO: extract resusable code

const EventsSection = ({ location }, { intl }) => {
  const { events, error } = useEventsList();

  // TODO: in case of error, show a message.

  return (
    <div className="section">
      <h3 className="title">{intl.messages['happening-this-week']}</h3>
      <div className="list">
        {events?.map((_, i) => <Card key={i} className="item" type="events" />) ??
          Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={`${i}-item`} className="item" />
          ))}
      </div>
      <button
        className="show-all"
        type="button"
        aria-label={intl.messages['find-all-events']}
      >
        {intl.messages['find-all-events']}
      </button>
    </div>
  );
};

EventsSection.contextTypes = {
  intl: intlShape.isRequired
};

EventsSection.propTypes = {
  location: locationShape.isRequired
};

export default connectToStores(
  EventsSection,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState()
  })
);
