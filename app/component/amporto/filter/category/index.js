import React from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { string, shape, func } from 'prop-types';
import { intlShape } from 'react-intl';
import Accordion from './accordion';
import { configShape } from '../../../../util/shapes';
import AccordionItem from './item';

const MAP_LAYERS_ICON = {
  stop: 'icon-icon_bus_with_background',
  pois: 'icon-explore-icon_pois_with_background',
  events: 'icon-explore-icon_events_with_background',
  routes: 'icon-explore-icon_routes_with_background',
  blocks: 'icon-explore-icon_blocks_with_background'
};

const CategoryGroup = (
  { language, onAllCategories, onCategory, filters },
  { config, intl }
) => (
  <div className="accordion-group-container">
    {Object.entries(filters).map(([type, { showAll, ...categories }]) => (
      Object.keys(categories).length === 0 ? null : <Accordion
        key={type}
        title={intl.messages[`filter-${type}-title`]}
        iconId={MAP_LAYERS_ICON[type]}
        ariaLabel={intl.messages['settings-dropdown-open-label']}
      >
        <div className="accordion-category-list">
          <AccordionItem
            type={type}
            category={intl.messages['all-selected']}
            onClick={() => onAllCategories(type)}
            showIcon={showAll}
            className="category"
          />

          {Object.entries(categories).map(([category, selected]) => {
            if (!config.filters[type][category]) {
              return null;
            }

            return (
              <AccordionItem
                key={`${type}-${category}`}
                category={decodeURIComponent(
                  config.filters[type][category][language]
                )}
                onClick={() => onCategory(type, category)}
                showIcon={selected}
                className="sub-category"
              />
            );
          })}
        </div>
      </Accordion>
    ))}
  </div>
);

CategoryGroup.propTypes = {
  language: string.isRequired,
  onAllCategories: func.isRequired,
  onCategory: func.isRequired,
  filters: shape().isRequired
};

CategoryGroup.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired
};

export default connectToStores(
  CategoryGroup,
  ['PreferencesStore'],
  context => ({
    language: context.getStore('PreferencesStore').getLanguage()
  })
);
