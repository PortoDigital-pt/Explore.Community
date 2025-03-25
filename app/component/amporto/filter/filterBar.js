import React, { useMemo } from 'react';
import { func, shape } from 'prop-types';
import classnames from 'classnames';
import { getContext } from 'recompose';
import Icon from '../../Icon';
import { configShape } from '../../../util/shapes';
import { setFilters } from '../../../action/FiltersActions';

const FILTERS = [
  {
    label: 'Transportes',
    icon: 'icon-icon_bus_no_map',
    selected: false,
    type: 'transports'
  },
  {
    label: 'Pontos de interesse',
    icon: 'icon-camera',
    selected: false,
    type: 'pois'
  },
  {
    label: 'Eventos',
    icon: 'icon-events',
    selected: false,
    type: 'events'
  },
  {
    label: 'Roteiros',
    icon: 'icon-store',
    selected: false,
    type: 'itineraries'
  }
];

const FilterBar = ({
  selectedFilters,
  openModal,
  config: { filters: defaultFilters },
  executeAction
}) => {
  const ButtonFilters = useMemo(() => {
    const Component = FILTERS.map(filter => {
      const selected = selectedFilters[filter.type]?.length > 0;
      const allSelected =
        selectedFilters[filter.type]?.length ===
        defaultFilters[filter.type]?.length;

      const iconName =
        !allSelected && selectedFilters[filter.type]?.length
          ? 'icon-icon_settings'
          : filter.icon;

      return (
        <button
          key={filter.type}
          type="button"
          aria-label={'name' /* TODO: add translation */}
          className={classnames('filter-container--content', {
            selected
          })}
          onClick={() => {
            const newState = {
              ...selectedFilters,
              [filter.type]: !selected ? [...defaultFilters[filter.type]] : []
            };

            executeAction(setFilters, newState);
          }}
        >
          <Icon img={iconName} viewBox="0 0 16 16" className="icon-prefix" />
          <span className="content-title">{filter.label}</span>
          {selected && (
            <Icon
              img="icon-x-circle"
              viewBox="0 0 16 16"
              className="icon-suffix"
            />
          )}
        </button>
      );
    });

    return () => Component;
  }, [selectedFilters, executeAction]);

  return (
    <div className="filter-container">
      <button
        type="button"
        aria-label={'open filter' /* TODO: add translation */}
        className="filter-container--content"
        onClick={openModal}
      >
        <span className="content-title">Todos os filtros</span>
      </button>
      <ButtonFilters />
    </div>
  );
};

FilterBar.propTypes = {
  openModal: func.isRequired,
  config: configShape.isRequired,
  selectedFilters: shape,
  executeAction: func.isRequired
};

export default getContext({
  config: configShape.isRequired,
  executeAction: func.isRequired
})(FilterBar);
