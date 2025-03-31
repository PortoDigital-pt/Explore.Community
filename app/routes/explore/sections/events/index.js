import React from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import { locationShape, configShape } from '../../../../util/shapes';
import { parseConfigDescriptionTextWithLink } from '../../../../util/amporto/text';
import Skeleton from '../../../../component/amporto/skeleton';
import Card from '../../../../component/amporto/card';
import { useEventsList } from './useEventsList';
// TODO: extract resusable code

const EventsSection = ({ language, location }, { config, intl }) => {
  const { events, error } = useEventsList();

  // TODO: in case of error, show a message.
  return (
    <div className="section">
      <h3 className="title">{intl.messages['happening-this-week']}</h3>
      <p>
        {parseConfigDescriptionTextWithLink(
          config.cards.events[language],
          config.culturalAgendaLink
        )}
      </p>
      <div className="list">
        {events?.map((_, i) => (
          <Card
            key={i}
            className="large-card"
            data={{ type: 'events', name: 'Event name', category: 'XXXX' }}
          />
        )) ??
          Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={`${i}-item`} className="large-card" />
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
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

EventsSection.propTypes = {
  location: locationShape.isRequired,
  language: string.isRequired
};

export default connectToStores(
  EventsSection,
  ['PositionStore', 'PreferencesStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState(),
    language: getStore('PreferencesStore').getLanguage()
  })
);
