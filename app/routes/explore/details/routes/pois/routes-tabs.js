/* eslint-disable no-console */
import React from 'react';
import { useRouter } from 'found';
import { arrayOf, bool, func, string } from 'prop-types';
import { intlShape } from 'react-intl';
import SwipeableTabs from '../../../../../component/SwipeableTabs';
import { setSelectedItem } from '../../../../../action/RoutesActions';
import { routesPoiShape } from '../shape';
import { MobileContent } from './mobile';
import { DesktopContent } from './desktop';

const RoutesTabs = (
  { pois, breakpoint, images, intl, selectedItem, onDetails },
  { executeAction }
) => {
  const { router } = useRouter();
  const isMobile = breakpoint !== 'large';

  const startItinerary = () => {
    const startPoint = pois[selectedItem];
    const endPoint = pois[selectedItem + 1];

    const startStr = `${startPoint.name}::${startPoint.lat},${startPoint.lon}`;
    const endStr = endPoint
      ? `${endPoint.name}::${endPoint.lat},${endPoint.lon}`
      : '-';
    const url = `${startStr}/${endStr}`;

    router.push(`/browse/itinerary/${url}`);
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
  intl: intlShape.isRequired,
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
