import React from 'react';
import { connectToStores } from 'fluxible-addons-react';
import { arrayOf, func } from 'prop-types';
import { useRouter } from 'found';
import { intlShape } from 'react-intl';
import Icon from '../../Icon';
import { favouriteShape } from '../../../util/shapes';
import {
  getFavouriteName,
  getRegularIconByFavorite
} from '../../../routes/profile/favourites/util';

const HorizontalFavorites = ({ favourites, onClick, intl }) => {
  const { router } = useRouter();

  return (
    <div className="horizontal-favorites-container">
      {favourites.map(favourite => (
        <button
          type="button"
          className="item"
          aria-label={getFavouriteName(favourite)}
          key={favourite.favouriteId}
          onClick={() => onClick(favourite)}
        >
          <Icon img={getRegularIconByFavorite(favourite)} viewBox="0 0 24 24" />
          {getFavouriteName(favourite)}
        </button>
      ))}

      <button
        type="button"
        className="item add-favourite"
        aria-label={intl.messages['favourites-more-favourites']}
        onClick={() => router.push('/profile/favourites')}
      >
        <Icon img="icon-plus" viewBox="0 0 24 24" />
      </button>
    </div>
  );
};

HorizontalFavorites.propTypes = {
  favourites: arrayOf(favouriteShape),
  onClick: func.isRequired,
  intl: intlShape.isRequired
};

export default connectToStores(
  HorizontalFavorites,
  ['FavouriteStore'],
  context => ({
    favourites: context.getStore('FavouriteStore')?.getFavourites()
  })
);
