import React, { useMemo, useState, useCallback, Fragment } from 'react';
import { useRouter } from 'found';
import { string, func, arrayOf } from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { intlShape } from 'react-intl';
import { locationShape, configShape } from '../../../util/shapes';
import withBreakpoint from '../../../util/withBreakpoint';
import useInfinitePaginatedListData from '../../../hooks/useInfinitePaginatedListData';
import useModal from '../../../hooks/useModal';
import useOnScreen from '../../../hooks/useOnScreen';
import useRouteLevel from '../../../hooks/useRouteLevel';
import Icon from '../../../component/Icon';
import BackButton from '../../../component/BackButton';
import Filters from '../../../component/amporto/filter';
import Skeleton from '../../../component/amporto/skeleton';
import ScrollToTopButton from '../../../component/amporto/scroll-to-top-button';
import {
  MOBILE_PAGE_CONTENT_TYPE_MAP,
  PAGE_CONTENT_TYPE_MAP
} from '../details/page-content';
import { DetailsContentModal } from '../common';

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
  const { isOpen, open, close } = useModal();
  const { isFirstLevelRoute } = useRouteLevel();
  const { router } = useRouter();
  const [selected, setSelected] = useState(null);

  const args = useMemo(
    () => ({ language, categories }),
    [language, (categories || []).join(',')]
  );
  const { data, total, error, onNextPage } = useInfinitePaginatedListData({
    enabled: categories !== null,
    location,
    coordinatesBounds,
    getData,
    args
  });
  const ref = useOnScreen({ onScreen: onNextPage });

  const navigate = useCallback(
    id => router.push(`/explore/${type}/${id}`),
    [router.push, type]
  );

  const ListItemComponent = useMemo(
    () => MOBILE_PAGE_CONTENT_TYPE_MAP[type],
    [type]
  );

  const Loading = useMemo(
    () => () => (
      <>
        {Array.from({ length: 10 }, (_, i) =>
          i === 9 ? (
            <Skeleton key={`${i}-item`} />
          ) : (
            <Fragment key={`${i}-item`}>
              <Skeleton />
              <hr />
            </Fragment>
          )
        )}
      </>
    ),
    []
  );

  const List = useMemo(
    () => () => (
      <div className="list">
        {data === null ? (
          <Loading />
        ) : (
          data.map((item, index) =>
            data.length === index + 1 ? (
              <ListItemComponent
                key={item.id}
                innerRef={ref}
                onDetails={() => {
                  setSelected(item);
                  open();
                }}
                selectedData={item}
              />
            ) : (
              <Fragment key={item.id}>
                <ListItemComponent
                  onDetails={() => {
                    setSelected(item);
                    open();
                  }}
                  selectedData={item}
                />
                <hr />
              </Fragment>
            )
          )
        )}
      </div>
    ),
    [data, ListItemComponent, Loading, setSelected, open]
  );

  const ModalPageContent = useMemo(() => PAGE_CONTENT_TYPE_MAP[type], [type]);

  return (
    <div className="list-page">
      <ScrollToTopButton targetClassname="list-page" />
      {breakpoint === 'large' && !isFirstLevelRoute && (
        <BackButton title={intl.messages[type]} />
      )}
      <Filters type={type} />
      {categories === null ? (
        <div className="error">
          {intl.messages['select-at-least-one-category']}
        </div>
      ) : (
        <>
          <h3 className="count">
            {total && `${total} ${intl.messages['search-results']}`}
          </h3>
          {error ? (
            <div className="error">
              <p>{intl.messages[errorMessage]}</p>
              <Icon img="icon-icon_error_page_not_found" />
            </div>
          ) : data?.length === 0 ? (
            <div className="error">
              <p>{intl.messages[emptyMessage]}</p>
            </div>
          ) : (
            <List />
          )}
        </>
      )}

      {isOpen && selected !== null && (
        <DetailsContentModal
          isOpen={isOpen}
          data={selected}
          onBackBtnClick={() => {
            setSelected(null);
            close();
          }}
          onSeeOnMap={() => {
            close();
            navigate(selected.id);
          }}
          PageContent={ModalPageContent}
        />
      )}
    </div>
  );
};

ListPage.contextTypes = {
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

ListPage.propTypes = {
  breakpoint: string.isRequired,
  type: string.isRequired,
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
