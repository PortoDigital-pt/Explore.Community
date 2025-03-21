import React, { Suspense } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { func } from 'prop-types';
import { configShape } from '../../../util/shapes';
import { addCategory, removeCategory } from '../../../action/FiltersActions';
import FilterBar from './filterBar';
import CustomModal from '../modal';
import useModal from '../../../hooks/useModal';
import AccordionGroup from '../accordion/group/index';

const Container = ({ filtersState }, { config, executeAction }) => {
  const { isOpen, open, close } = useModal();

  const updateFilters = (type, category, selected) => {
    const data = { type, category };

    if (selected) {
      executeAction(addCategory, data);
    } else {
      executeAction(removeCategory, data);
    }
  };

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
            <button
              type="button"
              onClick={() => close()}
              style={{
                width: '100%',
                height: '40px',
                border: '1px solid whitesmoke',
                backgroundColor: 'lightskyblue'
              }}
            >
              back
            </button>
            <AccordionGroup
              selectedFilters={filtersState}
              updateFilters={updateFilters}
            />
          </CustomModal>
        </Suspense>
      )}
    </>
  );
};

Container.contextTypes = {
  config: configShape.isRequired,
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
