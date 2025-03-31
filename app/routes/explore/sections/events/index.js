import React, { useMemo } from 'react';
import { string, arrayOf } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { parseConfigDescriptionTextWithLink } from '../../../../util/amporto/text';
import { useEventList } from './useEventList';
import Section from '../section';
import { configShape } from '../../../../util/shapes';

const EventsSection = ({ selectedCategories, language }, { config }) => {
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
    selectedCategories && (<Section
      selectedCategories={selectedCategories}
      useDataList={useEventList}
      title="happening-this-week"
      cardType="large"
      bottomButtonText="find-all-events"
      errorMessage="events-fetch-error"
      Intro={Intro}
    />)
  );
};

EventsSection.propTypes = {
  selectedCategories: arrayOf(string).isRequired,
  language: string.isRequired
};

EventsSection.contextTypes = {
  config: configShape.isRequired
};

export default connectToStores(
  EventsSection,
  ['MapLayerStore', 'PreferencesStore'],
  ({ getStore }) => {
    const { events } = getStore('MapLayerStore').getFilterLayers();
    const { showAll, ...categories } = events;
    const selectedCategories = Object.entries(categories)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, selected]) => selected)
      .map(([category]) => category);

    return {
      language: getStore('PreferencesStore').getLanguage(),
      selectedCategories: selectedCategories.length > 0 ? selectedCategories : null
    };
  }
);
