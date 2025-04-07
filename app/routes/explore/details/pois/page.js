import React from 'react';
import { string, func, shape, number, oneOfType, arrayOf } from 'prop-types';
import { intlShape } from 'react-intl';
import Icon from '../../../../component/Icon';
import { showDistance } from '../../../../util/amporto/geo';
import { getPoiById } from '../../../../util/amporto/api';
import Details from '../details';
import FavouriteExplore from '../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../component/amporto/share-button';

const poiShape = shape({
  type: string.isRequired,
  id: string.isRequired,
  address: shape({
    streetAddress: string.isRequired,
    streetNumber: string
  }).isRequired,
  category: oneOfType([string, arrayOf(string)]).isRequired,
  contacts: shape({
    telephone: string,
    url: string
  }),
  description: string.isRequired,
  lon: number.isRequired,
  lat: number.isRequired,
  name: string.isRequired,
  priceRange: string,
  calendar: shape(),
  districts: arrayOf(string),
  images: arrayOf(string)
});

const MobileContent = ({ onDetails, selectedData, distance }, { intl }) => (
  <div className="mobile-view">
    <div className="header">
      <div className="top">
        <div className="title">
          <Icon
            img="icon-explore-icon_pois_with_background"
            viewBox="0 0 44 44"
          />
          <h3>{selectedData.name}</h3>
        </div>
        <ShareButton withBackground />
        <FavouriteExplore data={selectedData} />
      </div>
      <div className="distance">
        {distance &&
          `${intl.messages['at-distance']} ${showDistance(distance)}`}
      </div>
    </div>
    <div className="content">
      <div className="image" />
      <div className="details">
        <div className="contacts">
          <div className="categories">
            {Array.isArray(selectedData.category) ? (
              selectedData.category.map(category => (
                <div key={category} className="category">
                  {category}
                </div>
              ))
            ) : (
              <div className="category">{selectedData.category}</div>
            )}
          </div>
          {selectedData.calendar && (
            <div>
              <Icon img="icon-time" viewBox="0 0 16 16" />
              <p>No info</p>
            </div>
          )}
          <div>
            <Icon img="icon-location" viewBox="0 0 16 16" />
            <p>{`${selectedData.address.streetAddress}${
              selectedData.address.streetNumber
                ? `, ${selectedData.address.streetNumber}`
                : ''
            }`}</p>
          </div>
          {selectedData.priceRange && (
            <div>
              <Icon img="icon-cost" viewBox="0 0 16 16" />
              <p>No info</p>
            </div>
          )}
        </div>
      </div>
    </div>
    <div className="bottom">
      <button
        type="button"
        onClick={onDetails}
        aria-label={intl.messages.details}
      >
        {intl.messages.details}
      </button>
    </div>
  </div>
);

MobileContent.propTypes = {
  onDetails: func.isRequired,
  selectedData: poiShape.isRequired,
  distance: number
};

MobileContent.contextTypes = {
  intl: intlShape.isRequired
};

export const PageContent = ({ selectedData }, { intl }) => (
  <>
    <div className="image" />
    <div className="details">
      <div className="description">
        <h3>{intl.messages.about}</h3>
        <p>{selectedData.description}</p>
      </div>
      {selectedData.calendar && (
        <div className="description">
          <h3>{intl.messages['opening-hours']}</h3>
          <p>No information at all</p>
        </div>
      )}
      <div className="contacts">
        {selectedData.priceRange && (
          <div>
            <Icon img="icon-cost" viewBox="0 0 16 16" />
            <p>{`${intl.messages['poi-tickets']}: No information at all`}</p>
          </div>
        )}
        {selectedData.contacts?.url && (
          <div>
            <Icon img="icon-website" viewBox="0 0 16 16" />
            <a
              href={selectedData.contacts.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              Website
            </a>
          </div>
        )}
        {selectedData.contacts?.telephone && (
          <div>
            <Icon img="icon-phone" viewBox="0 0 16 16" />
            <p>{selectedData.contacts.telephone ?? 'No information at all'}</p>
          </div>
        )}
      </div>
    </div>
  </>
);

PageContent.propTypes = {
  selectedData: poiShape.isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};

const PoiDetailsPage = () => (
  <Details
    getDataById={getPoiById}
    onErrorPath="/explore/pois"
    PageContent={PageContent}
    MobileContent={MobileContent}
  />
);

export default PoiDetailsPage;
