import PropTypes from 'prop-types';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { configShape } from '../util/shapes';
import Favourite from './Favourite';
import { saveFavourite, deleteFavourite } from '../action/FavouriteActions';

const FavouriteExplore = connectToStores(
  Favourite,
  ['FavouriteStore', 'UserStore', 'PreferencesStore'],
  (context, { data, white, blue }) => ({
    favourite: context
      .getStore('FavouriteStore')
      .isFavourite(data.id, data.type),
    isFetching: context.getStore('FavouriteStore').getStatus() === 'fetching',
    addFavourite: () => {
      context.executeAction(saveFavourite, {
        lat: data.lat,
        lon: data.lon,
        name: data.name,
        id: data.id,
        type: data.type
      });
    },
    deleteFavourite: () => {
      context.executeAction(deleteFavourite, { id: data.id });
    },
    requireLoggedIn: !context.config.allowFavouritesFromLocalstorage,
    isLoggedIn:
      context.config.allowLogin &&
      context.getStore('UserStore').getUser().sub !== undefined,
    language: context.getStore('PreferencesStore').getLanguage(),
    white,
    blue
  })
);

FavouriteExplore.contextTypes = {
  getStore: PropTypes.func.isRequired,
  executeAction: PropTypes.func.isRequired,
  config: configShape.isRequired
};

export default FavouriteExplore;
