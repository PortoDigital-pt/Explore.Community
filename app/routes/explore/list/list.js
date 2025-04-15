import React, { useMemo } from 'react';
import { string, func, arrayOf } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import { locationShape, configShape } from '../../../util/shapes';
import withBreakpoint from '../../../util/withBreakpoint';
import useListData from '../../../hooks/useListData';
import Icon from '../../../component/Icon';
import { MOBILE_PAGE_CONTENT_TYPE_MAP } from '../details/page-content';

const ListPage = (
  {
    breakpoint,
    type,
    location,
    getData,
    language,
    categories,
    emptyMessage,
    errorMessage
  },
  { intl, config: { coordinatesBounds } }
) => {
  const args = useMemo(
    () => ({ language, categories, limit: 1000 }),
    [language, categories]
  );
  /* TODO: pagination - infinite scrolling */
  const { data, error } = useListData({
    enabled: categories !== null,
    location,
    coordinatesBounds,
    getData,
    args
  });

  const ListItemComponent = useMemo(
    () => MOBILE_PAGE_CONTENT_TYPE_MAP[type],
    [type]
  );
  /* TODO: display total count on top */
  return (
    <div className="list-page">
      {error ? (
        <div className="error">
          <p>{intl.messages[errorMessage]}</p>
          <Icon img="icon-icon_error_page_not_found" />
        </div>
      ) : data === null ? (
        <div>
          {'Loading...' /* TODO: decide how to do it. spinner vs skeleton */}
        </div>
      ) : data.length === 0 ? (
        <div className="error">
          <p>{intl.messages[emptyMessage]}</p>
        </div>
      ) : (
        data.map(item => (
          <>
            <ListItemComponent
              key={item.id}
              onDetails={
                () => {} /* TODO: select and open modal with details */
              }
              selectedData={item}
            />
            <hr />
          </>
        ))
      )}
    </div>
  );
};

ListPage.contextTypes = {
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

ListPage.propTypes = {
  type: string.isRequired,
  breakpoint: string.isRequired,
  getData: func.isRequired,
  language: string.isRequired,
  location: locationShape.isRequired,
  categories: arrayOf(string),
  emptyMessage: string.isRequired,
  errorMessage: string.isRequired
};

export default connectToStores(
  withBreakpoint(ListPage),
  ['PositionStore', 'PreferencesStore', 'MapLayerStore'],
  ({ getStore }, { type }) => {
    let categories = null;

    if (type) {
      const { showAll, ...typeCategories } = getStore(
        'MapLayerStore'
      ).getFilterLayers({ only: type })[type];
      const selectedCategories = Object.entries(typeCategories)
        // eslint-disable-next-line no-unused-vars
        .filter(([_, selected]) => selected)
        .map(([category]) => category);

      categories = selectedCategories.length > 0 ? selectedCategories : null;
    }

    return {
      categories,
      language: getStore('PreferencesStore').getLanguage(),
      location: getStore('PositionStore').getLocationState()
    };
  }
);
