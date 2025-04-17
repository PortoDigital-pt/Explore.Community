import React, { useMemo, useState, useCallback } from 'react';
import { intlShape } from 'react-intl';
import { func, shape, string } from 'prop-types';
import AutoSuggest from '@digitransit-component/digitransit-component-autosuggest';
import { configShape } from '../../../util/shapes';
import {
  getLocationSearchTargets,
  withSearchContext
} from '../../../component/WithSearchContext';
import { favoriteTypeResolver, MY_PLACES } from './util';

const AutoSuggestWithSearchContext = withSearchContext(AutoSuggest);

const FavouriteForm = ({ onSave, favourite, config, intl, lang }) => {
  const [selectedFavourite, setSelectedFavourite] = useState(
    favourite ? { ...favourite } : null
  );
  const [name, setName] = useState(favourite?.name || '');
  const { fontWeights } = config;

  const onSelectPlace = useCallback(
    item => {
      if (item) {
        const newName = selectedFavourite?.myPlace
          ? selectedFavourite.name
          : item.name || item.address?.split(',')[0] || '';

        setSelectedFavourite({
          ...item,
          name: selectedFavourite?.myPlace ? selectedFavourite.name : newName,
          defaultName: newName,
          myPlace: selectedFavourite?.myPlace || item.myPlace,
          favouriteId: selectedFavourite?.favouriteId || null,
          type: favoriteTypeResolver(item)
        });

        setName(newName);
      }
    },
    [selectedFavourite]
  );

  const canSave = useMemo(() => {
    return selectedFavourite?.lat && name;
  }, [selectedFavourite, name]);

  const onSaveClick = useCallback(() => {
    const newState = {
      ...selectedFavourite,
      name
    };

    onSave(newState);
  }, [selectedFavourite, name]);

  return (
    <>
      <label className="favourite-label-search">
        {intl.messages['favourites-search-input-placeholder']}
      </label>

      <AutoSuggestWithSearchContext
        appElement="#app"
        sources={['History', 'Datasource']}
        targets={getLocationSearchTargets(config, true)}
        id="favourite"
        icon="search"
        placeholder={intl.messages['favourites-search-input-placeholder']}
        value={selectedFavourite?.address || ''}
        selectHandler={onSelectPlace}
        getAutoSuggestIcons={config.getAutoSuggestIcons}
        lang={lang}
        isMobile
        color="black"
        hoverColor="purple"
        fontWeights={fontWeights}
        required
        modeSet={config.iconModeSet}
        favouriteContext
      />

      <label className="favourite-label-name">
        {intl.messages['favourites-name-input-placeholder']}
      </label>
      <input
        disabled={Object.values(MY_PLACES).includes(selectedFavourite?.myPlace)}
        className="favourite-input-name"
        value={name}
        placeholder={intl.messages['favourites-name-input-placeholder']}
        onChange={e => {
          setName(e.target.value);
        }}
      />

      <button
        type="button"
        disabled={!canSave}
        onClick={onSaveClick}
        aria-label={intl.messages.save}
        className="save-button"
      >
        {intl.messages.save}
      </button>
    </>
  );
};

FavouriteForm.propTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired,
  lang: string,
  onSave: func.isRequired,
  favourite: shape()
};

export default FavouriteForm;
