/* eslint-disable no-console */
import React from 'react';
import { useRouter } from 'found';
import { arrayOf, bool, func, string } from 'prop-types';
import SwipeableTabs from '../../../../../component/SwipeableTabs';
import { setSelectedItem } from '../../../../../action/RoutesActions';
import { routesPoiShape } from '../shape';
import { MobileContent } from './mobile';
import { DesktopContent } from './desktop';
import { getItineraryPath } from '../util';

const RoutesTabs = (
  { pois, breakpoint, images, selectedItem, onDetails },
  { executeAction }
) => {
  const { router } = useRouter();
  const isMobile = breakpoint !== 'large';

  const startItinerary = () => {
    const startPoint = pois[selectedItem];
    router.push(getItineraryPath(startPoint));
  };

  const changeHash = index => {
    executeAction(setSelectedItem, index);
  };

  const tabs = pois?.map(poi => {
    return (
      <div className="swipeable-tab" key={`routes-tab-${poi.position}`}>
        <div className="routes-tab routes-details-page">
          {isMobile ? (
            <MobileContent
              selectedData={{ ...poi, images }}
              key={`routes-tab-${poi.position}`}
              onDetails={onDetails}
              onStartItinerary={startItinerary}
            />
          ) : (
            <DesktopContent
              breakpoint={breakpoint}
              selectedData={{ ...poi, images }}
              key={`routes-tab-${poi.position}`}
              onStartItinerary={startItinerary}
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
  images: arrayOf(string)
};

RoutesTabs.contextTypes = {
  executeAction: func.isRequired
};

RoutesTabs.defaultProps = {};

export default RoutesTabs;
