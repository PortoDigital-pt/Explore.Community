/* eslint-disable no-unstable-nested-components */
import React, { useMemo } from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { parseConfigDescriptionTextWithLink } from '../../../../util/amporto/text';
import { getEventList } from '../../../../util/amporto/api';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const EventsSection = ({ language }, { config }) => {
  const Intro = useMemo(
    () => () => (
      <p>
        {parseConfigDescriptionTextWithLink(
          config.cards.events[language],
          config.culturalAgendaLink
        )}
      </p>
    ),
    [language]
  );

  return (
    <Section
      getData={getEventList}
      title="happening-this-week"
      cardType="large"
      bottomButtonText="find-all-events"
      errorMessage="events-fetch-error"
      emptyMessage="events-empty"
      Intro={Intro}
      type="events"
    />
  );
};

EventsSection.propTypes = {
  language: string.isRequired
};

EventsSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  EventsSection,
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
