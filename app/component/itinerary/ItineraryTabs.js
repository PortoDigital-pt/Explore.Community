import React, { useCallback, useMemo } from 'react';
import PropTypes, { func } from 'prop-types';
import { useRouter, matchShape } from 'found';
import ItineraryDetails from './ItineraryDetails';
import SwipeableTabs from '../SwipeableTabs';
import { planEdgeShape } from '../../util/shapes';
import { clearOngoingTrip, getOngoingTrip } from '../../store/sessionStorage';
import {
  isItTheLastPoint,
  IsThereAnOngoingTrip,
  setSelectedItemToNextPoint
} from './ongoing-trip-util';
import { getItineraryPath } from '../../routes/explore/details/routes/util';
import Icon from '../Icon';
import { otpToLocation } from '../../util/otpStrings';

/* eslint-disable react/no-array-index-key */

function ItineraryTabs(
  { planEdges, tabIndex, isMobile, changeHash, ...rest },
  { getStore, match }
) {
  const { router } = useRouter();
  const { params } = match;

  const location = getStore('PositionStore').getLocationState();
  const destinationAddress = useMemo(
    () => otpToLocation(params.to)?.address,
    [params.to]
  );
  const ongoingTrip = useMemo(
    () => getOngoingTrip(destinationAddress),
    [destinationAddress]
  );

  const goToNextOngoingTripPoint = useCallback(() => {
    const updatedOngoingTrip = setSelectedItemToNextPoint();
    const nextDestination =
      updatedOngoingTrip.route.pois[updatedOngoingTrip.selectedItem];

    if (location?.name) {
      router.push(getItineraryPath(location, nextDestination));
    } else {
      const origin =
        updatedOngoingTrip.route.pois[updatedOngoingTrip.selectedItem - 1];
      router.push(getItineraryPath(origin, nextDestination));
    }
  }, []);

  const cancelOngoingTrip = useCallback(() => {
    clearOngoingTrip();
    router.push('/browse');
  }, []);

  const itineraryTabs = planEdges.map((edge, i) => {
    return (
      <div
        className={`swipeable-tab ${tabIndex !== i && 'inactive'}`}
        key={`itinerary-${i}`}
        aria-hidden={tabIndex !== i}
      >
        <ItineraryDetails
          itinerary={edge.node}
          changeHash={isMobile ? changeHash : undefined}
          isMobile={isMobile}
          {...rest}
        />
      </div>
    );
  });

  const showOngoingTrip = IsThereAnOngoingTrip(destinationAddress);

  return (
    <div className="itinerary-tabs-content">
      {showOngoingTrip && (
        <div className="ongoing-trip-title">
          <Icon
            img="icon-explore-icon_routes_with_background"
            className="ongoing-trip-icon"
            viewBox="0 0 50 50"
          />
          <span>{ongoingTrip.route?.name}</span>
        </div>
      )}

      <SwipeableTabs
        tabs={itineraryTabs}
        tabIndex={tabIndex}
        onSwipe={changeHash}
        classname={isMobile ? 'swipe-mobile-divider' : 'swipe-desktop-view'}
        ariaFrom="swipe-summary-page"
        ariaFromHeader="swipe-summary-page-header"
      />

      {showOngoingTrip && (
        <div className="ongoing-trip-buttons">
          {!isItTheLastPoint(
            ongoingTrip.selectedItem,
            ongoingTrip.route.pois
          ) && (
            <span className="go-to-next-point">
              <button type="button" onClick={goToNextOngoingTripPoint}>
                <Icon
                  img="icon-circle"
                  text={ongoingTrip.selectedItem + 2}
                  className="next-point-icon"
                />
                {ongoingTrip.route.pois[ongoingTrip.selectedItem + 1].name}
              </button>
            </span>
          )}
          <span className="cancel-itinerary">
            <button type="button" onClick={cancelOngoingTrip}>
              Cancelar roteiro
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

ItineraryTabs.contextTypes = {
  getStore: func.isRequired,
  match: matchShape.isRequired
};

ItineraryTabs.propTypes = {
  tabIndex: PropTypes.number.isRequired,
  isMobile: PropTypes.bool.isRequired,
  planEdges: PropTypes.arrayOf(planEdgeShape).isRequired,
  changeHash: PropTypes.func
};

ItineraryTabs.defaultProps = {
  changeHash: undefined
};

export default ItineraryTabs;
