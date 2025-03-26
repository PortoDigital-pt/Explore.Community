import React from 'react';
import classnames from 'classnames';
import { string } from 'prop-types';
import FavouriteExplore from '../../FavouriteExploreContainer';

const Card = ({ className }) => (
  <div className={classnames('card', className)}>
    <div className="favourite-top">
      <FavouriteExplore data={{}} white />
    </div>
    <div className="image-cover" />
    <div className="content">
      <h3>Title</h3>
      <div className="categories">
        <div className="category">CATEGORY</div>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  className: string
};

export default Card;
