import React from 'react';
import { func, shape } from 'prop-types';
import { getContext } from 'recompose';
import Accordion from './accordion';
import { configShape } from '../../../../util/shapes';
import AccordionItem from './item';

const MAP_LAYERS = [
  {
    type: 'transports',
    title: 'Transportes',
    icon: 'icon-icon_bus_with_background'
  },
  {
    type: 'pois',
    title: 'Pontos de interesse',
    icon: 'icon-explore-icon_pois_with_background'
  },
  {
    type: 'events',
    title: 'Eventos',
    icon: 'icon-explore-icon_events_with_background'
  }
];

const CategoryGroup = ({
  selectedFilters,
  updateFilters,
  onCheckAll,
  config: { filters: defaultFilters }
}) => {
  return (
    <div className="accordion-group-container">
      {MAP_LAYERS.map(layer => {
        return (
          <Accordion key={layer.type} title={layer.title} iconId={layer.icon}>
            <div className="accordion-category-list">
              <AccordionItem
                type={layer.type}
                category="Todos" // TODO: translation
                onClick={() =>
                  onCheckAll({
                    type: layer.type,
                    selected:
                      selectedFilters[layer.type]?.length !==
                      defaultFilters[layer.type]?.length
                  })
                }
                showIcon={
                  selectedFilters[layer.type]?.length ===
                  defaultFilters[layer.type]?.length
                }
                className="category"
              />
              {defaultFilters[layer.type]?.map(category => {
                const selected =
                  selectedFilters[layer.type]?.includes(category);
                const allSelected =
                  selectedFilters[layer.type]?.length ===
                  defaultFilters[layer.type]?.length;

                return (
                  <AccordionItem
                    key={`${layer.type}-${category}`}
                    category={category}
                    onClick={() =>
                      updateFilters({
                        type: layer.type,
                        category,
                        selected: !selected
                      })
                    }
                    showIcon={!allSelected && selected}
                    className="sub-category"
                  />
                );
              })}
            </div>
          </Accordion>
        );
      })}
    </div>
  );
};

CategoryGroup.propTypes = {
  updateFilters: func.isRequired,
  onCheckAll: func.isRequired,
  config: configShape.isRequired,
  selectedFilters: shape
};

export default getContext({
  config: configShape.isRequired
})(CategoryGroup);
