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
import classname from 'classnames';
import { connectToStores } from 'fluxible-addons-react';
import { intlShape } from 'react-intl';
import { locationShape } from '../../../../util/shapes';
import Icon from '../../../../component/Icon';
import { showDistance } from '../../../../util/amporto/geo';
import { getPoiById } from '../../../../util/amporto/api';
import Details from '../details';
import FavouriteExplore from '../../../../component/FavouriteExploreContainer';
import ShareButton from '../../../../component/amporto/share-button';
import ImageSlider from '../../../../component/amporto/image-slider';
import useDistanceToTarget from '../../../../hooks/useDistanceToTarget';
import useExpandableDescription from '../../../../hooks/useExpandableDescription';

export const poiShape = shape({
  type: string.isRequired,
  id: string.isRequired,
  address: shape({
    streetAddress: string,
    streetNumber: string
  }).isRequired,
  category: oneOfType([string, arrayOf(string)]).isRequired,
  contacts: shape({
    telephone: string,
    url: string
  }),
  description: string,
  lon: number.isRequired,
  lat: number.isRequired,
  name: string.isRequired,
  priceRange: string,
  calendar: arrayOf(string),
  districts: arrayOf(string),
  images: arrayOf(string)
});

const Mobile = (
  {
    location,
    onDetails,
    selectedData,
    showShare = false,
    innerRef,
    fromRoutes = false,
    onStartItinerary
  },
  { intl, executeAction }
) => {
  const distanceToPoi = useDistanceToTarget({
    executeAction,
    location,
    targetPoint: selectedData
  });

  return (
    <div className="mobile-view" ref={innerRef}>
      {fromRoutes ? (
        <div className="header">
          <div className="title">
            <Icon img="icon-circle" text={selectedData.position} />
            <h3 className="routes-tab">{selectedData.name}</h3>
          </div>

          <div className="distance">
            {!!distanceToPoi &&
              `${intl.messages['at-distance']} ${showDistance(distanceToPoi)}`}
          </div>
        </div>
      ) : (
        <div className="header">
          <div className="top">
            <div className="title">
              <Icon
                img="icon-explore-icon_pois_with_background"
                viewBox="0 0 50 50"
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
      )}

      <div className="content">
        {selectedData.images && (
          <div className="image">
            <img
              src={selectedData.images[0]}
              alt={selectedData.name}
              loading="lazy"
            />
          </div>
        )}
        <div className="details">
          <div className="contacts">
            <div className="categories">
              {!fromRoutes &&
                (Array.isArray(selectedData.category) ? (
                  selectedData.category.map(category => (
                    <div key={category} className="category">
                      {category}
                    </div>
                  ))
                ) : (
                  <div className="category">{selectedData.category}</div>
                ))}
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
            {selectedData.address.streetAddress && (
              <div>
                <Icon img="icon-location" viewBox="0 0 16 16" />
                <p>{`${selectedData.address.streetAddress}${
                  selectedData.address.streetNumber
                    ? `, ${selectedData.address.streetNumber}`
                    : ''
                }`}</p>
              </div>
            )}
            {selectedData.priceRange && (
              <div>
                <Icon img="icon-cost" viewBox="0 0 16 16" />
                <p>{intl.messages[`tickets-${selectedData.priceRange}`]}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {fromRoutes ? (
        <div className="buttons">
          <button
            type="button"
            className="button-light"
            aria-label={intl.messages.details}
            onClick={onDetails}
          >
            {intl.messages.details}
          </button>
          <button
            type="button"
            onClick={onStartItinerary}
            aria-label={intl.messages['start-here']}
          >
            {intl.messages['start-here']}
          </button>
        </div>
      ) : (
        <div className="bottom">
          <button
            type="button"
            onClick={onDetails}
            aria-label={intl.messages.details}
          >
            {intl.messages.details}
          </button>
        </div>
      )}
    </div>
  );
};

Mobile.propTypes = {
  innerRef: shape(),
  onDetails: func.isRequired,
  selectedData: poiShape.isRequired,
  location: locationShape.isRequired,
  showShare: bool,
  fromRoutes: bool,
  onStartItinerary: func
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

export const PageContent = ({ selectedData }, { intl }) => {
  const ExpandableDescription = useExpandableDescription({
    description: selectedData.description,
    intl
  });

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
        {selectedData.description && (
          <div className="description">
            <h3>{intl.messages.about}</h3>
            <ExpandableDescription />
          </div>
        )}
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
              <p>
                {selectedData.contacts.telephone ?? 'No information at all'}
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

PageContent.propTypes = {
  selectedData: poiShape.isRequired
};

PageContent.contextTypes = {
  intl: intlShape.isRequired
};

const PoiDetailsPage = () => (
  <Details
    getDataById={getPoiById}
    onErrorPath="/pois"
    PageContent={PageContent}
    MobileContent={MobileContent}
  />
);

export default PoiDetailsPage;
