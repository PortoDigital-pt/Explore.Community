/* eslint-disable no-nested-ternary */
import React, { useCallback, useState, useMemo } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { useRouter } from 'found';
import { arrayOf, string, oneOf, func } from 'prop-types';
import { intlShape } from 'react-intl';
import { locationShape, configShape } from '../../../util/shapes';
import Skeleton from '../../../component/amporto/skeleton';
import Card from '../../../component/amporto/card';
import Icon from '../../../component/Icon';
import useListData from '../../../hooks/useListData';
import useModal from '../../../hooks/useModal';
import { PAGE_CONTENT_TYPE_MAP } from '../details/page-content';
import { DetailsContentModal } from '../common';

const Section = (
  {
    type,
    language,
    location,
    categories,
    getData,
    title,
    cardType,
    bottomButtonText,
    errorMessage,
    emptyMessage,
    Intro
  },
  { intl, config: { coordinatesBounds } }
) => {
  const args = useMemo(() => ({ language, categories }), [language, ...categories]);
  const { data, error } = useListData({
    location,
    coordinatesBounds,
    getData,
    args
  });
  const { isOpen, open, close } = useModal();
  const [selected, setSelected] = useState(null);
  const { router } = useRouter();

  const navigate = useCallback(
    id => router.push(`/explore/${type}/${id}`),
    [router.push, type]
  );

  const onShowAll = useCallback(
    () => router.push(`/explore/${type}`),
    [router.push, type]
  );

  return (
    <section className="section">
      <h3 className="title">{intl.messages[title]}</h3>
      {Intro && <Intro />}
      <div className="list">
        {error ? (
          <div className="error">
            <p>{intl.messages[errorMessage]}</p>
            <Icon img="icon-icon_error_page_not_found" />
          </div>
        ) : data === null ? (
          Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={`${i}-item`} className={`${cardType}-card`} />
          ))
        ) : data.length === 0 ? (
          <div className="error">
            <p>{intl.messages[emptyMessage]}</p>
          </div>
        ) : (
          data.map(item => (
            <Card
              key={item.id}
              className={`${cardType}-card`}
              onClick={() => {
                setSelected(item);
                open();
              }}
              data={item}
              type={type}
            />
          ))
        )}
      </div>
      {!error && (
        <button
          className="show-all"
          type="button"
          aria-label={intl.messages[bottomButtonText]}
          onClick={onShowAll}
        >
          {intl.messages[bottomButtonText]}
        </button>
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
          PageContent={PAGE_CONTENT_TYPE_MAP[type]}
        />
      )}
    </section>
  );
};

Section.contextTypes = {
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

Section.propTypes = {
  type: string.isRequired,
  Intro: func,
  emptyMessage: string.isRequired,
  errorMessage: string.isRequired,
  bottomButtonText: string.isRequired,
  cardType: oneOf(['small', 'large']).isRequired,
  title: string.isRequired,
  getData: func.isRequired,
  language: string.isRequired,
  location: locationShape.isRequired,
  categories: arrayOf(string).isRequired
};

export default connectToStores(
  Section,
  ['PositionStore', 'PreferencesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    location: getStore('PositionStore').getLocationState()
  })
);
