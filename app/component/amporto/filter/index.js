import React from 'react';
import { func } from 'prop-types';
import Icon from '../../Icon';
import FilterButton from './button';

const filters = [
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

const Filter = ({ openModal }) => {
  const renderFilters = () => {
    const buttons = filters.map(it => {
      return (
        <FilterButton
          key={it.type}
          label={it.label}
          icon={
            <Icon img={it.icon} viewBox="0 0 16 16" className="icon-prefix" />
          }
          selected={it.selected}
          handleClick={() => console.log(it.type)}
        />
      );
    });

    buttons.unshift(
      <FilterButton
        key="all"
        label="Todos os filtros"
        icon={
          <Icon
            img="icon-icon_settings"
            viewBox="0 0 16 16"
            className="icon-prefix"
          />
        }
        selected={false}
        handleClick={() => openModal()}
      />
    );
    return buttons;
  };

  return <div className="filter-container">{renderFilters()}</div>;
};

Filter.propTypes = {
  openModal: func,
};

Filter.defaultProps = {
  openModal: () => {},
};

export default Filter;
