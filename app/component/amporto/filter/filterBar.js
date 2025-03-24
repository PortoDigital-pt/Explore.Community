import React from 'react';
import { func, shape } from 'prop-types';
import { getContext } from 'recompose';
import Icon from '../../Icon';
import FilterButton from './button';
import { configShape } from '../../../util/shapes';
import { setFilters } from '../../../action/FiltersActions';

const filters = [
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
  const renderFilters = () => {
    const buttons = filters.map(it => {
      const selected = selectedFilters[it.type]?.length > 0;
      const allSelected =
        selectedFilters[it.type]?.length === defaultFilters[it.type]?.length;

      const iconName =
        !allSelected && selectedFilters[it.type]?.length
          ? 'icon-icon_settings'
          : it.icon;

      return (
        <FilterButton
          key={it.type}
          label={it.label}
          icon={
            <Icon img={iconName} viewBox="0 0 16 16" className="icon-prefix" />
          }
          selected={selected}
          handleClick={() => {
            const newState = {
              ...selectedFilters,
              [it.type]: !selected ? [...defaultFilters[it.type]] : []
            };

            executeAction(setFilters, newState);
          }}
        />
      );
    });

    buttons.unshift(
      <FilterButton
        key="all"
        label="Todos os filtros"
        selected={false}
        handleClick={() => openModal()}
        alwaysUnselected
      />
    );
    return buttons;
  };

  return <div className="filter-container">{renderFilters()}</div>;
};

FilterBar.propTypes = {
  openModal: func,
  config: configShape.isRequired,
  selectedFilters: shape,
  executeAction: func.isRequired
};

FilterBar.defaultProps = {
  openModal: () => {}
};

export default getContext({
  config: configShape.isRequired,
  executeAction: func.isRequired
})(FilterBar);
