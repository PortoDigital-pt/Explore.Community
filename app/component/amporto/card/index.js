import React from 'react';
import classnames from 'classnames';
import {
  string,
  shape,
  number,
  func,
  arrayOf,
  oneOfType,
  bool,
  node
} from 'prop-types';
import FavouriteExplore from '../../FavouriteExploreContainer';

const Card = ({
  type,
  className,
  data,
  onClick,
  showDescription = false,
  Details = null
}) => (
  <div
    role="button"
    tabIndex={0}
    aria-label={data.name}
    onKeyDown={e => {
      if (e.code === 'Enter' || e.nativeEvent.code === 'Enter') {
        onClick();
      }
    }}
    className={classnames('card', className, type)}
    onClick={onClick}
  >
    <div className="favourite-top">
      <FavouriteExplore data={data} white={!!data.images} blue={!data.images} />
    </div>

    {data.images && (
      <div className="image-cover">
        <img src={data.images[0]} alt={data.name} />
      </div>
    )}

    <div className={classnames('card-content', type)}>
      <div className={classnames('card-title', { smaller: !data.images })}>
        <h3>{data.name}</h3>
      </div>
      {showDescription && data.description && (
        <div className="description">
          <span>{data.description}</span>
        </div>
      )}
      {Details && (
        <div className="details">
          <Details selectedData={data} />
        </div>
      )}
      <div className="categories">
        {Array.isArray(data.category) ? (
          data.category.map(category => (
            <div key={category} className="category">
              {category}
            </div>
          ))
        ) : (
          <div className="category">{data.category}</div>
        )}
      </div>
    </div>
  </div>
);

Card.propTypes = {
  type: string.isRequired,
  className: string,
  onClick: func.isRequired,
  data: shape({
    type: string.isRequired,
    name: string.isRequired,
    id: string.isRequired,
    images: arrayOf(string),
    category: oneOfType([string, arrayOf(string)]).isRequired,
    lat: number.isRequired,
    lon: number.isRequired,
    description: string
  }).isRequired,
  showDescription: bool,
  Details: node
};

export default Card;
