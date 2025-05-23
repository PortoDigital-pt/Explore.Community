import React, { useState } from 'react';
import PropTypes, { string } from 'prop-types';
import SwipeableTabs from '../../../../component/SwipeableTabs';
import useDistanceToTarget from '../../../../hooks/useDistanceToTarget';
import Icon from '../../../../component/Icon';

function RoutesTabs({ pois, breakpoint, executeAction, location, images }) {
  console.log('log-RoutesTabs::location', location);
  console.log('log-RoutesTabs::executeAction', executeAction);
  console.log('log-pois', pois);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const isMobile = breakpoint === 'mobile';

  const changeHash = index => {
    setSelectedIndex(index);
  };

  // const itineraryTabs = planEdges.map((edge, i) => {
  const tabs = pois?.map((poi, i) => {
    return (
      <div
        className={`swipeable-tab}`}
        key={`routes-tab-${i}`}
        // aria-hidden={tabIndex !== i}
      >
        <div className="routes-tab routes-details-page">
          <div className="mobile-view">
            <div className="header">
              <div className="top">
                <div className="title icon-position">
                  <Icon img="icon-circle" text={poi.position} />
                  <h3 className="routes-tab">{poi.name}</h3>
                </div>
                {/* {showShare && <ShareButton withBackground />}
                <FavouriteExplore data={poi} /> */}
              </div>
              <div className="distance">
                {/* {!!distanceToPoi &&
                  `${intl.messages['at-distance']} ${showDistance(
                    distanceToPoi,
                  )}`} */}
              </div>
            </div>
            <div className="content">
              {images && (
                <div className="image">
                  <img src={images[i]} alt={poi.name} loading="lazy" />
                </div>
              )}
              <div className="details">
                <div className="contacts">
                  {poi.calendar && (
                    <div>
                      <Icon img="icon-time" viewBox="0 0 16 16" />
                      <div className="schedule">
                        {poi.calendar?.map(schedule => (
                          <p key={schedule}>{schedule}</p>
                        ))}
                      </div>
                    </div>
                  )}
                  {poi.address?.streetAddress && (
                    <div>
                      <Icon img="icon-location" viewBox="0 0 16 16" />
                      <p>{`${poi.address?.streetAddress}${
                        poi.address?.streetNumber
                          ? `, ${poi.address?.streetNumber}`
                          : ''
                      }`}</p>
                    </div>
                  )}
                  {poi.priceRange && (
                    <div>
                      <Icon img="icon-cost" viewBox="0 0 16 16" />
                      <p>
                        989899
                        {/* {intl.messages[`tickets-${poi?.priceRange}`]} */}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="bottom">
              <button
                onClick={() => 'onDetails'}
                // aria-label={intl.messages.details}
              >
                Iniciar aqui
                {/* {intl.messages.details} */}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  });

  return (
    <SwipeableTabs
      tabs={tabs}
      tabIndex={selectedIndex}
      onSwipe={changeHash}
      classname={isMobile ? 'swipe-mobile-divider' : 'swipe-desktop-view'}
      ariaFrom="swipe-summary-page"
      ariaFromHeader="swipe-summary-page-header"
    />
  );
}

RoutesTabs.propTypes = {
  // tabIndex: PropTypes.number.isRequired,
  // isMobile: PropTypes.bool.isRequired,
  // planEdges: PropTypes.arrayOf(planEdgeShape).isRequired,
  // changeHash: PropTypes.func,
};

// RoutesTabs.defaultProps = {
//   changeHash: undefined,
// };

export default RoutesTabs;
