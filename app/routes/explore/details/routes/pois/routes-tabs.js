/* eslint-disable no-console */
import React, { useMemo } from 'react';
import { arrayOf, bool, func, string } from 'prop-types';
import SwipeableTabs from '../../../../../component/SwipeableTabs';
import { setSelectedItem } from '../../../../../action/RoutesActions';
import { routesPoiShape } from '../shape';
import { DesktopContent } from './desktop';
import { MobileContent } from '../../pois/page';

const RoutesTabs = (
  { pois, breakpoint, selectedItem, onDetails, onStartItinerary },
  { executeAction }
) => {
  const isMobile = useMemo(() => breakpoint !== 'large', [breakpoint]);

  const changeHash = index => {
    executeAction(setSelectedItem, index);
  };

  const tabs = pois?.map(poi => {
    return (
      <div className="swipeable-tab" key={`routes-tab-${poi.position}`}>
        <div className="routes-tab routes-details-page">
          {isMobile ? (
            <MobileContent
              selectedData={{ ...poi }}
              key={`routes-tab-${poi.position}`}
              onDetails={onDetails}
              onStartItinerary={onStartItinerary}
              fromRoutes
            />
          ) : (
            <DesktopContent
              breakpoint={breakpoint}
              selectedData={{ ...poi }}
              key={`routes-tab-${poi.position}`}
              onStartItinerary={onStartItinerary}
            />
          )}
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
  selectedItem: bool.isRequired,
  pois: arrayOf(routesPoiShape).isRequired,
  onDetails: func.isRequired,
  breakpoint: string,
  onStartItinerary: func.isRequired
};

RoutesTabs.contextTypes = {
  executeAction: func.isRequired
};

RoutesTabs.defaultProps = {};

export default RoutesTabs;
