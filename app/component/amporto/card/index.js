import React from 'react';
import classnames from 'classnames';
import { string, shape, number, func } from 'prop-types';
import FavouriteExplore from '../../FavouriteExploreContainer';

const Card = ({ className, data, onClick }) => (
  <div
    role="button"
    tabIndex={0}
    aria-label={data.name}
    onKeyDown={e => {
      if (e.code === 'Enter' || e.nativeEvent.code === 'Enter') {
        onClick();
      }
    }}
    className={classnames('card', className)}
    onClick={onClick}
  >
    <div className="favourite-top">
      <FavouriteExplore data={data} white />
    </div>
    <div className="image-cover" />
    <div className="content">
      <h3>{data.name}</h3>
      <div className="categories">
        {data.type === 'events' && <div className="details">event details</div>}
        <div className="category">{data.category}</div>
      </div>
    </div>
  </div>
);

Card.propTypes = {
  className: string,
  onClick: func.isRequired,
  data: shape({
    type: string.isRequired,
    name: string.isRequired,
    id: string.isRequired,
    category: string.isRequired,
    lat: number.isRequired,
    lon: number.isRequired
  }).isRequired
};

export default Card;
