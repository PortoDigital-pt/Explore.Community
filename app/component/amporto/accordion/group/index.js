import React from 'react';
import { func } from 'prop-types';
import { getContext } from 'recompose';
import Accordion from '..';
import { configShape } from '../../../../util/shapes';
import AccordionItem from './item';

const groups = [
  {
    type: 'transports',
    title: 'Transportes',
    icon: 'icon-icon_bus_with_background',
    selected: false
  },
  {
    type: 'pois',
    title: 'Pontos de interesse',
    icon: 'icon-explore-icon_pois_with_background',
    selected: false
  },
  {
    type: 'events',
    title: 'Eventos',
    icon: 'icon-explore-icon_events_with_background',
    selected: false
  }
];

function Container({
  selectedFilters,
  updateFilters,
  config: { filters: defaultFilters },
  executeAction
}) {
  const getContentCategories = item => {
    return defaultFilters[item.type]?.map(category => {
      const selected = selectedFilters[item.type]?.includes(category);

      return (
        <AccordionItem
          type={item.type}
          key={`${item.type}-${category}`}
          isSelected={selected}
          category={category}
          onClick={updateFilters}
        />
      );
    });
  };

  const buildAccordion = () => {
    return groups.map(it => {
      return (
        <Accordion key={it.type} title={it.title} iconId={it.icon}>
          <div className="accordion-category-list">
            {getContentCategories(it)}
          </div>
        </Accordion>
      );
    });
  };

  return <div className="accordion-group-container">{buildAccordion()}</div>;
}

Container.propTypes = {
  updateFilters: func.isRequired,
  config: configShape.isRequired,
  executeAction: func.isRequired
};

const AccordionGroup = getContext({
  config: configShape.isRequired,
  executeAction: func.isRequired
})(Container);

export default AccordionGroup;
