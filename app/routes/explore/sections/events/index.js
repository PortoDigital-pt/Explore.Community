import React, { useMemo } from 'react';
import { string } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { parseConfigDescriptionTextWithLink } from '../../../../util/amporto/text';
import { getEventList } from '../../../../util/amporto/api';
import withBreakpoint from '../../../../util/withBreakpoint';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const EventsSection = ({ language, breakpoint }, { config }) => {
  const Intro = useMemo(
    () => () =>
      config.cards.events?.[language] && config.culturalAgendaLink ? (
        <p>
          {parseConfigDescriptionTextWithLink(
            config.cards.events[language],
            config.culturalAgendaLink
          )}
        </p>
      ) : null,
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
      limit={breakpoint === 'large' ? 1 : 10}
    />
  );
};

EventsSection.propTypes = {
  language: string.isRequired,
  breakpoint: string.isRequired
};

EventsSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  withBreakpoint(EventsSection),
  ['PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage()
  })
);
