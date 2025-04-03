/* eslint-disable no-nested-ternary */
import React, { useCallback } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { useRouter } from 'found';
import { arrayOf, string, oneOf, func } from 'prop-types';
import { intlShape } from 'react-intl';
import { locationShape, configShape } from '../../../util/shapes';
import Skeleton from '../../../component/amporto/skeleton';
import Card from '../../../component/amporto/card';
import Icon from '../../../component/Icon';
import { useListData } from '../common/hooks';

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
  const { data, error } = useListData({
    language,
    location,
    coordinatesBounds,
    getData,
    args: { categories }
  });
  const { router } = useRouter();

  const navigate = useCallback(
    (id, type) => router.push(`/explore/${type}/${id}`),
    [router.push]
  );

  const onShowAll = useCallback(
    () => router.push(`/explore/${type}`),
    [router.push, type]
  );

  return (
    <div className="section">
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
              onClick={() => navigate(item.id, item.type)}
              data={item}
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
    </div>
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
