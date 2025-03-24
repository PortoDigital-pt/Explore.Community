import React from 'react';
import { func, shape } from 'prop-types';
import { getContext } from 'recompose';
import Accordion from '..';
import { configShape } from '../../../../util/shapes';
import AccordionItem from './item';

const groups = [
  {
    type: 'transports',
    title: 'Transportes',
    icon: 'icon-icon_bus_with_background',
    selected: false,
  },
  {
    type: 'pois',
    title: 'Pontos de interesse',
    icon: 'icon-explore-icon_pois_with_background',
    selected: false,
  },
  {
    type: 'events',
    title: 'Eventos',
    icon: 'icon-explore-icon_events_with_background',
    selected: false,
  },
];

function Container({
  selectedFilters,
  updateFilters,
  onCheckAll,
  config: { filters: defaultFilters },
}) {
  const getContentCategories = item => {
    const allSelected =
      selectedFilters[item.type]?.length === defaultFilters[item.type]?.length;

    const items = [
      <AccordionItem
        type={item.type}
        key={`${item.type}-parent`}
        isSelected={allSelected}
        category="Todos"
        onClick={onCheckAll}
        showIcon={allSelected}
        className="category"
      />,
    ];

    defaultFilters[item.type]?.forEach(category => {
      const selected = selectedFilters[item.type]?.includes(category);

      items.push(
        <AccordionItem
          type={item.type}
          key={`${item.type}-${category}`}
          category={category}
          onClick={updateFilters}
          isSelected={selected}
          showIcon={!allSelected && selected}
          className="sub-category"
        />,
      );
    });

    return items;
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
  onCheckAll: func.isRequired,
  config: configShape.isRequired,
  selectedFilters: shape,
};

const AccordionGroup = getContext({
  config: configShape.isRequired,
})(Container);

export default AccordionGroup;
