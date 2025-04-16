import React from 'react';
import {
  string,
  func,
  shape,
  number,
  oneOfType,
  arrayOf,
  bool
} from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { locationShape } from '../../../../util/shapes';
import Icon from '../../../../component/Icon';
import { showDistance } from '../../../../util/amporto/geo';
import { getPoiById } from '../../../../util/amporto/api';
import Details from '../details';
import FavouriteExplore from '../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../component/amporto/share-button';
import useDistanceToTarget from '../../../../hooks/useDistanceToTarget';

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
  calendar: arrayOf(string),
  districts: arrayOf(string),
  images: arrayOf(string)
});

const Mobile = (
  { location, onDetails, selectedData, showShare = false, innerRef },
  { intl, executeAction }
) => {
  const distanceToPoi = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  return (
    <div className="mobile-view" ref={innerRef}>
      <div className="header">
        <div className="top">
          <div className="title">
            <Icon
              img="icon-explore-icon_pois_with_background"
              viewBox="0 0 44 44"
            />
            <h3>{selectedData.name}</h3>
          </div>
          {showShare && <ShareButton withBackground />}
          <FavouriteExplore data={selectedData} />
        </div>
        <div className="distance">
          {!!distanceToPoi &&
            `${intl.messages['at-distance']} ${showDistance(distanceToPoi)}`}
        </div>
      </div>
      <div className="content">
        <div className="image">
          {selectedData.images && (
            <img
              src={selectedData.images[0]}
              alt={selectedData.name}
              loading="lazy"
            />
          )}
        </div>
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
                <div className="schedule">
                  {selectedData.calendar.map(schedule => (
                    <p key={schedule}>{schedule}</p>
                  ))}
                </div>
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
                <p>{intl.messages[`tickets-${selectedData.priceRange}`]}</p>
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
};

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: poiShape.isRequired,
  location: locationShape.isRequired,
  showShare: bool
};

Mobile.contextTypes = {
  intl: intlShape.isRequired,
  executeAction: func.isRequired
};

export const MobileContent = connectToStores(
  Mobile,
  ['PositionStore'],
  ({ getStore }) => ({
    location: getStore('PositionStore').getLocationState()
  })
);

export const PageContent = ({ selectedData }, { intl }) => (
  <>
    <div className="image">
      {
        selectedData.images && (
          <img
            src={selectedData.images[0]}
            alt={selectedData.name}
            loading="lazy"
          />
        ) /* TODO: change to slider */
      }
    </div>
    <div className="details">
      <div className="description">
        <h3>{intl.messages.about}</h3>
        <p>{selectedData.description}</p>
      </div>
      {selectedData.calendar && (
        <div className="description">
          <h3>{intl.messages['opening-hours']}</h3>
          {selectedData.calendar.map(schedule => (
            <p key={schedule}>{schedule}</p>
          ))}
        </div>
      )}
      <div className="contacts">
        {selectedData.priceRange && (
          <div>
            <Icon img="icon-cost" viewBox="0 0 16 16" />
            <p>{intl.messages[`tickets-${selectedData.priceRange}`]}</p>
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
