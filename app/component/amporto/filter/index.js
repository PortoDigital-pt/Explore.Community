import React, { Suspense, useCallback } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { func, shape } from 'prop-types';
import {
  addCategory,
  removeCategory,
  categoryOnOff
} from '../../../action/FiltersActions';
import FilterBar from './filterBar';
import { configShape } from '../../../util/shapes';
import CustomModal from '../modal';
import useModal from '../../../hooks/useModal';
import AccordionGroup from './category';
import Icon from '../../Icon';
import { updateMapLayers } from '../../../action/MapLayerActions';


const Filters = ({ mapLayers }, { executeAction, config: { filters } }) => {
  const { isOpen, open, close } = useModal();
 
  const updateLayers = useCallback(type => {
    console.log('MAP LAYERS: ', mapLayers[type]);
      executeAction(updateMapLayers, { [type]: { showAll: !mapLayers[type].showAll }});
  }, [mapLayers]);

  const updateFilters = useCallback(
    ({ type, category, selected }) => {
      const data = { type, category };
      const action = selected ? addCategory : removeCategory;
      executeAction(action, data);
    },
    [executeAction]
  );

  const checkAllByCategory = useCallback(
    ({ type, selected }) => {
      const data = { type, isSelected: selected };
      executeAction(categoryOnOff, data);
    },
    [executeAction]
  );

  return (
    <>
      <FilterBar filters={mapLayers} openModal={open} onClick={updateLayers}/>
      {isOpen && (
        <Suspense fallback="">
          <CustomModal
            isOpen={isOpen}
            className="filters-popup"
            overlayClassName="overlay"
            shouldFocusAfterRender
            shouldCloseOnEsc
          >
            <div className="filters-top-bar">
              <button
                className="btn-close"
                aria-label="close" // TODO: add translation
                type="button"
                onClick={close}
              >
                <Icon
                  img="icon-icon_close"
                  viewBox="0 0 1024 1024"
                  className="popup-close-icon"
                />
                <span className="title">
                  {/* TODO: add translation */ 'Filtros'}
                </span>
              </button>
            </div>
            <AccordionGroup
              selectedFilters={filtersState}
              updateFilters={updateFilters}
              onCheckAll={checkAllByCategory}
            />
          </CustomModal>
        </Suspense>
      )}
    </>
  );
};

Filters.propTypes = {
  mapLayers: shape().isRequired
};

Filters.contextTypes = {
  config: configShape.isRequired,
  executeAction: func.isRequired
};

export default connectToStores(
  Filters, 
  ['MapLayerStore'], 
  context => ({
    mapLayers: context.getStore('MapLayerStore').getFilterLayers()
  })
);
