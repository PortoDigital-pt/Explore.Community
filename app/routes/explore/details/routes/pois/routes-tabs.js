import React from 'react';
import { arrayOf, bool, func } from 'prop-types';
import { intlShape } from 'react-intl';
import SwipeableTabs from '../../../../../component/SwipeableTabs';
import Icon from '../../../../../component/Icon';
import { setSelectedItem } from '../../../../../action/RoutesActions';
import { routesPoiShape } from '../shape';

const RoutesTabs = (
  { pois, breakpoint, images, intl, selectedItem, onDetails },
  { executeAction }
) => {
  const isMobile = breakpoint === 'mobile';

  const changeHash = index => {
    executeAction(setSelectedItem, index);
  };

  const tabs = pois?.map((poi, i) => {
    return (
      <div className="swipeable-tab" key={`routes-tab-${poi.position}`}>
        <div className="routes-tab routes-details-page">
          <div className="mobile-view">
            <div className="header">
              <div className="title">
                <Icon img="icon-circle" text={poi.position} />
                <h3 className="routes-tab">{poi.name}</h3>
              </div>

              <div className="distance">500M</div>
            </div>
            <div className="content">
              {images && (
                <div className="image">
                  <img src={images[i]} alt={poi.name} loading="lazy" />
                </div>
              )}
              <div className="details">
                <div className="contacts">
                  {/* todo - remove it when we have real data  */}
                  {(poi.calendar || true) && (
                    <div>
                      <Icon img="icon-time" viewBox="0 0 16 16" />
                      <div className="schedule">
                        <p>{intl.messages['opening-hours']}</p>
                      </div>
                    </div>
                  )}
                  {/* todo - remove it when we have real data  */}
                  {(poi.priceRange || true) && (
                    <div>
                      <Icon img="icon-cost" viewBox="0 0 16 16" />
                      <p>Gratuito</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="buttons">
              <button
                type="button"
                className="button-light"
                aria-label={intl.messages.details}
                onClick={() => onDetails()}
              >
                {intl.messages.details}
              </button>
              <button
                type="button"
                onClick={() => 'onDetails'}
                aria-label={intl.messages['start-here']}
              >
                {intl.messages['start-here']}
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
      tabIndex={selectedItem}
      onSwipe={changeHash}
      classname={isMobile ? 'swipe-mobile-divider' : 'swipe-desktop-view'}
      ariaFrom="swipe-summary-page"
      ariaFromHeader="swipe-summary-page-header"
    />
  );
};

RoutesTabs.propTypes = {
  intl: intlShape.isRequired,
  selectedItem: bool.isRequired,
  pois: arrayOf(routesPoiShape).isRequired
};

RoutesTabs.contextTypes = {
  executeAction: func.isRequired
};

RoutesTabs.defaultProps = {};

export default RoutesTabs;
