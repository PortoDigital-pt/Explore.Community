import React, { useCallback } from 'react';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { useRouter } from 'found';
import { arrayOf, string, oneOf, func } from 'prop-types';
import { intlShape } from 'react-intl';
import { locationShape, configShape } from '../../../util/shapes';
import Skeleton from '../../../component/amporto/skeleton';
import Card from '../../../component/amporto/card';

const Section = (
  {
    language,
    location,
    selectedCategories,
    useDataList,
    title,
    cardType,
    bottomButtonText
  },
  { intl, config: { coordinatesBounds } }
) => {
  const { data, error } = useDataList({
    language,
    location,
    coordinatesBounds,
    selectedCategories
  });
  const { router } = useRouter();

  const navigate = useCallback(
    (id, type) => router.push(`/explore/${type}/${id}`),
    [router.push]
  );

  return (
    <div className="section">
      <h3 className="title">{intl.messages[title]}</h3>
      <div className="list">
        {error ? (
          <>error message</>
        ) : (
          data?.map(item => (
            <Card
              key={item.id}
              className={`${cardType}-card`}
              onClick={() => navigate(item.id, item.type)}
              data={item}
            />
          )) ??
          Array.from({ length: 10 }, (_, i) => (
            <Skeleton key={`${i}-item`} className={`${cardType}-card`} />
          ))
        )}
      </div>
      <button
        className="show-all"
        type="button"
        aria-label={intl.messages[bottomButtonText]}
      >
        {intl.messages[bottomButtonText]}
      </button>
    </div>
  );
};

Section.contextTypes = {
  intl: intlShape.isRequired,
  config: configShape.isRequired
};

Section.propTypes = {
  bottomButtonText: string.isRequired,
  cardType: oneOf(['small', 'large']).isRequired,
  title: string.isRequired,
  useDataList: func.isRequired,
  language: string.isRequired,
  location: locationShape.isRequired,
  selectedCategories: arrayOf(string).isRequired
};

export default connectToStores(
  Section,
  ['PositionStore', 'PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => {
    const { pois } = getStore('MapLayerStore').getFilterLayers();
    const { showAll, ...categories } = pois;
    const selectedCategories = Object.entries(categories)
      // eslint-disable-next-line no-unused-vars
      .filter(([_, selected]) => selected)
      .map(([category]) => category);

    return {
      language: getStore('PreferencesStore').getLanguage(),
      location: getStore('PositionStore').getLocationState(),
      selectedCategories
    };
  }
);
