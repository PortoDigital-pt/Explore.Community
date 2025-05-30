import React, { useMemo } from 'react';
import { func, shape } from 'prop-types';
import { intlShape } from 'react-intl';
import classnames from 'classnames';
import { getContext } from 'recompose';
import Icon from '../../Icon';

const FILTERS_ICON_MAP = {
  stop: 'icon-icon_bus_no_map',
  pois: 'icon-camera',
  events: 'icon-events',
  routes: 'icon-routes',
  blocks: 'icon-blocks'
};

const FilterBar = ({ filters, openModal, onClick }, { intl }) => {
  const ButtonFilters = useMemo(() => {
    const Component = Object.entries(filters).map(
      ([type, { showAll, ...values }]) => {
        const someSelected = Object.values(values).find(element => element);

        const iconName =
          !showAll && someSelected
            ? 'icon-icon_settings'
            : FILTERS_ICON_MAP[type];

        return (
          <button
            key={type}
            type="button"
            aria-label={intl.messages[`filter-${type}-title`]}
            className={classnames('filter-container--content', {
              selected: someSelected
            })}
            onClick={() => onClick(type)}
          >
            <Icon img={iconName} viewBox="0 0 16 16" className="icon-prefix" />
            <span className="content-title">
              {intl.messages[`filter-${type}-title`]}
            </span>
            {someSelected && (
              <Icon
                img="icon-x-circle"
                viewBox="0 0 16 16"
                className="icon-suffix"
              />
            )}
          </button>
        );
      }
    );

    return () => Component;
  }, [filters, onClick]);

  return (
    <div className="filter-container">
      <button
        type="button"
        aria-label={intl.messages['all-filters']}
        className="filter-container--content"
        onClick={openModal}
      >
        <span className="content-title">{intl.messages['all-filters']}</span>
      </button>
      {Object.keys(filters).length > 1 && <ButtonFilters />}
    </div>
  );
};

FilterBar.propTypes = {
  openModal: func.isRequired,
  onClick: func.isRequired,
  filters: shape().isRequired
};

FilterBar.contextTypes = {
  intl: intlShape.isRequired
};

export default getContext()(FilterBar);
