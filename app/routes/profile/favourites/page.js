import React, { Suspense, useCallback, useMemo, useState } from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { func, string, arrayOf, shape } from 'prop-types';
import { configShape } from '../../../util/shapes';
import BackButton from '../../../component/BackButton';
import Icon from '../../../component/Icon';
import useModal from '../../../hooks/useModal';
import {
  saveFavourite,
  deleteFavourite
} from '../../../action/FavouriteActions';
import CustomModal from '../../../component/amporto/modal';
import { getPlaceIcon, MY_PLACES } from './util';
import OptionsButton from './options-button';
import FavouriteForm from './form';

const Favourites = ({ lang, favourites }, { config, executeAction, intl }) => {
  const { isOpen, open, close } = useModal();
  const [selectedFavourite, setSelectedFavourite] = useState(null);

  const home = favourites?.find(f => f.myPlace === 'home');
  const work = favourites?.find(f => f.myPlace === 'work');
  const favouritesWithoutMyPlaces = favourites?.filter(
    favourite => !Object.values(MY_PLACES).includes(favourite.myPlace)
  );

  const addOrEditMyPlaces = useCallback((item, myPlace) => {
    let newState;

    if (item) {
      newState = {
        ...item,
        name: item.name || '',
        defaultName: item.name || item.address,
        myPlace
      };
    } else {
      newState = {
        myPlace,
        name: intl?.messages[`favourites-my-locals-${myPlace}`] || ''
      };
    }
    setSelectedFavourite(newState);
    open();
  }, []);

  const clearSelectedFavourite = useCallback(() => {
    setSelectedFavourite(null);
  }, []);

  const onSave = useCallback(
    newState => {
      executeAction(saveFavourite, newState);
      clearSelectedFavourite();
      close();
    },
    [selectedFavourite]
  );

  const onEdit = useCallback(favourite => {
    setSelectedFavourite(favourite);
    open();
  }, []);

  const onDelete = useCallback(favourite => {
    executeAction(deleteFavourite, favourite);
  }, []);

  const defaultAddress = useMemo(() => {
    return home?.address || intl.messages['favourites-set-location'];
  }, [home, intl]);

  return (
    <div className="favourites-page">
      <BackButton title={intl.messages.favourites} fallback="back" />

      <div className="favourites-container">
        <div className="favourites-list-container">
          <button
            type="button"
            className="create-section"
            aria-label={intl.messages['favourites-add']}
            onClick={() => {
              setSelectedFavourite(null);
              open();
            }}
          >
            <Icon
              img="icon-plus-circle"
              className="icon-create-favourite"
              viewBox="0 0 24 24"
            />
            <span className="create-label">
              {intl.messages['favourites-add']}
            </span>
          </button>
          <div className="favourites-list-divider" />

          <div className="my-locals item">
            <Icon
              img="icon-home-with-background"
              className="icon-my-locals-home"
              viewBox="0 0 34 34"
            />

            <div className="my-locals-info">
              <span className="title">
                {intl.messages['favourites-my-locals-home']}
              </span>
              <span className="sub-title">
                {defaultAddress || intl.messages['favourites-set-location']}
              </span>
            </div>

            <OptionsButton
              onEdit={() => addOrEditMyPlaces(home, MY_PLACES.home)}
              favourite={home}
              intl={intl}
              onDelete={() => onDelete(home)}
            />
          </div>

          <div className="my-locals item">
            <Icon
              img="icon-work-with-background"
              className="icon-my-locals-home"
              viewBox="0 0 34 34"
            />

            <div className="my-locals-info">
              <span className="title">
                {intl.messages['favourites-my-locals-work']}
              </span>
              <span className="sub-title">
                {work?.address || intl.messages['favourites-set-location']}
              </span>
            </div>

            <OptionsButton
              onEdit={() => addOrEditMyPlaces(work, MY_PLACES.work)}
              favourite={work}
              intl={intl}
              onDelete={() => onDelete(work)}
            />
          </div>

          {favouritesWithoutMyPlaces?.length > 0 && (
            <>
              <div className="favourites-list-divider" />
              {favouritesWithoutMyPlaces?.map(favourite => (
                <div
                  className="favourites-item item"
                  key={favourite.favouriteId}
                >
                  <div className="my-locals item">
                    <Icon
                      img={getPlaceIcon(favourite.type)}
                      className="icon-my-locals-home"
                      viewBox="0 0 50 50"
                    />
                    <div className="my-locals-info">
                      <span className="title">
                        {favourite.name || favourite.address?.split(',')[0]}
                      </span>
                      <span className="sub-title">
                        {favourite.address || ''}
                      </span>
                    </div>
                    <OptionsButton
                      onEdit={() => onEdit(favourite)}
                      onDelete={() => {
                        onDelete(favourite);
                      }}
                      intl={intl}
                      favourite={favourite}
                    />
                  </div>
                </div>
              ))}
            </>
          )}
        </div>

        {isOpen && (
          <Suspense fallback="">
            <CustomModal
              isOpen={isOpen}
              className="favourites-popup"
              overlayClassName="favourites-popup-overlay"
              shouldFocusAfterRender
              shouldCloseOnEsc
            >
              <BackButton
                onBackBtnClick={close}
                title={
                  intl.messages[
                    `favourites-${
                      selectedFavourite?.favouriteId ? 'edit' : 'add'
                    }`
                  ]
                }
                fallback="back"
              />
              <div className="content">
                <FavouriteForm
                  onSave={onSave}
                  favourite={selectedFavourite}
                  config={config}
                  intl={intl}
                  lang={lang}
                />
              </div>
            </CustomModal>
          </Suspense>
        )}
      </div>
    </div>
  );
};

Favourites.contextTypes = {
  config: configShape.isRequired,
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

Favourites.propTypes = {
  lang: string.isRequired,
  favourites: arrayOf(shape())
};

export default connectToStores(
  Favourites,
  ['PreferencesStore', 'FavouriteStore'],
  context => ({
    lang: context.getStore('PreferencesStore').getLanguage(),
    favourites: context.getStore('FavouriteStore').getFavourites()
  })
);
