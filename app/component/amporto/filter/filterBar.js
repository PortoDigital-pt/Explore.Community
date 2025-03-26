import React, { useMemo } from 'react';
import { func, shape } from 'prop-types';
import classnames from 'classnames';
import { getContext } from 'recompose';
import Icon from '../../Icon';
import { configShape } from '../../../util/shapes';

const FILTERS_ICON_MAP = {
  stop: 'icon-icon_bus_no_map',
  pois: 'icon-camera',
  events: 'icon-events'
};

const FilterBar = ({ filters, openModal, onClick }, { config }) => {
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
            aria-label={'name' /* TODO: add translation */}
            className={classnames('filter-container--content', {
              selected: someSelected
            })}
            onClick={() => onClick(type)}
          >
            <Icon img={iconName} viewBox="0 0 16 16" className="icon-prefix" />
            <span className="content-title">
              {type /* TODO: check later */}
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
  onClick: func.isRequired,
  filters: shape().isRequired
};

FilterBar.contextTypes = {
  config: configShape.isRequired
};

export default getContext({
  config: configShape.isRequired
})(FilterBar);
