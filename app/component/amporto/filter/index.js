import React, { Suspense, useCallback } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { func, shape } from 'prop-types';
import FilterBar from './filterBar';
import CustomModal from '../modal';
import useModal from '../../../hooks/useModal';
import CategoryGroup from './category';
import Icon from '../../Icon';
import { updateMapLayersCustom } from '../../../action/MapLayerActions';

const Filters = ({ mapLayers }, { executeAction, intl }) => {
  console.log('log-Filters::mapLayers ', mapLayers);

  const { isOpen, open, close } = useModal();

  const toggleCheckAll = useCallback(
    type => {
      executeAction(updateMapLayersCustom, {
        [type]: Object.entries(mapLayers[type]).reduce(
          (acc, [key]) => ({ ...acc, [key]: !mapLayers[type].showAll }),
          {}
        )
      });
    },
    [mapLayers, executeAction]
  );

  const toggleSingleCategory = useCallback(
    (type, category) => {
      const data = {
        [type]: {
          ...mapLayers[type],
          [category]: !mapLayers[type][category]
        }
      };

      data[type] = {
        ...data[type],
        showAll: !Object.entries(data[type])
          .filter(([key]) => key !== 'showAll')
          // eslint-disable-next-line no-unused-vars
          .some(([_, value]) => !value)
      };

      executeAction(updateMapLayersCustom, data);
    },
    [mapLayers]
  );

  return (
    <>
      <FilterBar
        filters={mapLayers}
        openModal={open}
        onClick={toggleCheckAll}
      />
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
                aria-label={intl.messages.close}
                type="button"
                onClick={close}
              >
                <Icon
                  img="icon-icon_close"
                  viewBox="0 0 1024 1024"
                  className="popup-close-icon"
                />
                <span className="title">{intl.messages['filters-title']}</span>
              </button>
            </div>
            <CategoryGroup
              filters={mapLayers}
              onAllCategories={toggleCheckAll}
              onCategory={toggleSingleCategory}
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
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

export default connectToStores(
  Filters,
  ['MapLayerStore'],
  ({ getStore }, { type }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: type })
  })
);
