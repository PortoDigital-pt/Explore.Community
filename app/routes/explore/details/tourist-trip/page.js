import React from 'react';
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

export const PageContent = ({ selectedData }, { intl }) => (
  <>
    {selectedData.images && (
      <div className="image">
        <ImageSlider images={selectedData.images} name={selectedData.name} />
      </div>
    )}
    <div
      className={classname('details', { lower: selectedData.images === null })}
    >
      <TouristTripContactDetails selectedData={selectedData} />
      <div className="description">
        {selectedData.description && (
          <>
            <h3>{intl.messages.about}</h3>
            {selectedData.description && <p>{selectedData.description}</p>}
          </>
        )}

        <a
          href={selectedData.website}
          target="_blank"
          rel="noopener noreferrer"
        >
          {intl.messages['know-more']}
        </a>
      </div>
    </div>
  </>
);

PageContent.propTypes = {
  selectedData: touristTripShape.isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};
