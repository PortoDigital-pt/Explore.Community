import React, { useMemo } from 'react';
import classnames from 'classnames';
import { string, shape, number, func, arrayOf, oneOfType } from 'prop-types';
import FavouriteExplore from '../../FavouriteExploreContainer';

import { PAGE_CONTENT_PIECES_TYPE_MAP } from '../../../routes/explore/details/page-content';

const Card = ({ type, className, data, onClick }) => {
  const Details = useMemo(() => {
    const Component = PAGE_CONTENT_PIECES_TYPE_MAP[type]?.details;

    if (!Component) {
      return null;
    }

    return () => <Component selectedData={data} />;
  }, [type, data]);

  return (
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
      <div className="image-cover">
        {data.images && <img src={data.images[0]} alt={data.name} />}
      </div>
      <div className="content">
        <div className="card-title">
          <h3>{data.name}</h3>
        </div>
        {Details && (
          <div className="details">
            <Details />
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
};

Card.propTypes = {
  type: string.isRequired,
  className: string,
  onClick: func.isRequired,
  data: shape({
    type: string.isRequired,
    name: string.isRequired,
    id: string.isRequired,
    images: arrayOf(string).isRequired,
    category: oneOfType([string, arrayOf(string)]).isRequired,
    lat: number.isRequired,
    lon: number.isRequired
  }).isRequired
};

export default Card;
