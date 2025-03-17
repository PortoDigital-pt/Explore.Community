import { useEffect, useMemo } from 'react';
import distance from '@digitransit-search-util/digitransit-search-util-distance';
import {
  checkPositioningPermission,
  startLocationWatch
} from '../action/PositionActions';

const useDistanceToTarget = ({ executeAction, location, targetPoint }) => {
  useEffect(() => {
    checkPositioningPermission().then(permission => {
      if (permission.state === 'granted' && location.status === 'no-location') {
        executeAction(startLocationWatch);
      }
    });
  }, [location.status]);

  return useMemo(() => {
    if (!targetPoint || !location.hasLocation) {
      return null;
    }

    return distance(targetPoint, location);
  }, [targetPoint, location.hasLocation]);
};

export default useDistanceToTarget;
