import React from 'react';
import Icon from '../../Icon';
import FilterButton from './button';

const filters = [
  {
    label: 'Todos os filtros',
    icon: 'icon-icon_settings',
    selected: true,
    type: 'all',
  },
  {
    label: 'Transportes',
    icon: 'icon-icon_bus_no_map',
    selected: false,
    type: 'transports',
  },
  {
    label: 'Pontos de interesse',
    icon: 'icon-camera',
    selected: false,
    type: 'pois',
  },
  {
    label: 'Eventos',
    icon: 'icon-events',
    selected: false,
    type: 'events',
  },
  {
    label: 'Roteiros',
    icon: 'icon-store',
    selected: false,
    type: 'itineraries',
  },
];

const Filter = () => {
  const renderFilters = () => {
    return filters.map(it => {
      return (
        <FilterButton
          key={it.type}
          label={it.label}
          icon={
            <Icon img={it.icon} viewBox="0 0 16 16" className="icon-prefix" />
          }
          selected={it.selected}
        />
      );
    });
  };

  return <div className="filter-container">{renderFilters()}</div>;
};

Filter.propTypes = {};

export default Filter;
