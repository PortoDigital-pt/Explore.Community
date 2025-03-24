import React, { Suspense, useCallback } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { func, shape } from 'prop-types';
import {
  addCategory,
  removeCategory,
  categoryOnOff
} from '../../../action/FiltersActions';
import FilterBar from './filterBar';
import CustomModal from '../modal';
import useModal from '../../../hooks/useModal';
import AccordionGroup from '../accordion/group/index';
import Icon from '../../Icon';

const Container = ({ filtersState }, { executeAction }) => {
  const { isOpen, open, close } = useModal();

  const updateFilters = useCallback(
    ({ type, category, selected }) => {
      const data = { type, category };

      if (selected) {
        executeAction(addCategory, data);
      } else {
        executeAction(removeCategory, data);
      }
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
      <FilterBar selectedFilters={filtersState} openModal={() => open()} />
      {isOpen && (
        <Suspense fallback="">
          <CustomModal
            isOpen={isOpen}
            className="filters-popup modal"
            overlayClassName="overlay"
            shouldFocusAfterRender
            shouldCloseOnEsc
          >
            <div className="filters-top-bar">
              <button
                className="btn-close"
                type="button"
                onClick={() => close()}
              >
                <Icon
                  img="icon-icon_close"
                  viewBox="0 0 1024 1024"
                  className="popup-close-icon"
                />
                <span className="title">Filtros</span>
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

Container.propTypes = {
  filtersState: shape
};

Container.contextTypes = {
  executeAction: func.isRequired
};

const FilterContainer = connectToStores(
  Container,
  ['FiltersStore'],
  context => {
    const filtersState = context.getStore('FiltersStore').getFilters();
    return { filtersState, context };
  }
);

export default FilterContainer;
