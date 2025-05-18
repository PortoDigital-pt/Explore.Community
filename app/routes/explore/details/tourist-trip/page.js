import React, { useState } from 'react';
import { intlShape } from 'react-intl';
import { arrayOf, number, shape, string } from 'prop-types';
import classname from 'classnames';
import Icon from '../../../../component/Icon';
import ImageSlider from '../../../../component/amporto/image-slider';

const touristTripShape = shape({
  type: string.isRequired,
  id: string.isRequired,
  name: string.isRequired,
  pois: arrayOf(
    shape({
      position: number.isRequired,
      item: string.isRequired,
      name: string.isRequired,
      description: string.isRequired,
      duration: string.isRequired,
      difficulty: string.isRequired
    })
  )
});

export const TouristTripContactDetails = ({ selectedData }, { intl }) => (
  <div className="detail-info">
    <div className="pois-and-duration">
      <div>
        <Icon img="icon-camera" viewBox="0 0 16 16" />
        <p>
          {selectedData.pois?.length} {intl.messages.pois.toLowerCase()}
        </p>
      </div>
      <div>
        <Icon img="icon-icon_clock" viewBox="0 0 16 16" />
        <p>{selectedData.duration}</p>
      </div>
    </div>

    <div>
      <Icon img="icon-difficulty" viewBox="0 0 16 16" />
      <p>
        {intl.messages['tourist-trip-card-difficulty-label']}:{' '}
        {
          intl.messages[
            `tourist-trip-card-difficulty-description-${selectedData.difficulty}`
          ]
        }
      </p>
    </div>
  </div>
);

TouristTripContactDetails.propTypes = {
  selectedData: touristTripShape.isRequired
};

TouristTripContactDetails.contextTypes = {
  intl: intlShape.isRequired
};

export const PageContent = ({ selectedData }, { intl }) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <>
      {selectedData.images && (
        <div className="image">
          <ImageSlider images={selectedData.images} name={selectedData.name} />
        </div>
      )}
      <div
        className={classname('details', {
          lower: selectedData.images === null
        })}
      >
        <TouristTripContactDetails selectedData={selectedData} />
        <div className="description">
          {selectedData.description && (
            <>
              <h3>{intl.messages.about}</h3>
              {selectedData.description && <p>{selectedData.description}</p>}
            </>
          )}
        </div>

        <div className="itinerary-header">
          <div className="left">
            <Icon img="icon-icon_walk_no_map" viewBox="0 0 16 16" />
            <p className="label">
              {intl.messages['tourist-trip-itinerary-label']}
            </p>
          </div>

          <div className="right">
            <p className="key">
              {intl.messages['tourist-trip-total-distance-label']}
            </p>
            <p className="value">{selectedData.distance}</p>
          </div>
        </div>

        <div className="itinerary-warning">
          {intl.messages['tourist-trip-warning-section']}
        </div>

        <div className="itinerary-list-container">
          {selectedData.pois?.map((poi, index) => {
            if (showMore || index <= 2) {
              return (
                <div className="row" key={poi.item}>
                  <div className="first-column">
                    <Icon img="icon-circle" text={poi.position} />
                    <div className="vertical-line" />
                  </div>

                  <div className="second-column">
                    <div className="title">{poi.name}</div>
                    <div className="description">
                      {decodeURIComponent(poi.description)}
                      <button
                        type="button"
                        onClick={() => alert('WIP')}
                        className="know-more"
                      >
                        {intl.messages['know-more']}
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            return null;
          })}

          {selectedData.pois?.length > 3 && (
            <button
              type="button"
              className="show-more-button"
              onClick={() => setShowMore(!showMore)}
              aria-label={
                intl.messages['tourist-trip-itinerary-list-show-more']
              }
            >
              {showMore
                ? intl.messages['tourist-trip-itinerary-list-show-less']
                : intl.messages['tourist-trip-itinerary-list-show-more']}
            </button>
          )}
        </div>

        <button
          className="start-trip-button"
          type="button"
          onClick={() => alert('WIP')}
          aria-label={intl.messages['tourist-trip-start-trip']}
        >
          {intl.messages['tourist-trip-start-trip']}
        </button>
      </div>
    </>
  );
};

PageContent.propTypes = {
  selectedData: touristTripShape.isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};
