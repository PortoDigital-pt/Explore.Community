import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import connectToStores from 'fluxible-addons-react/connectToStores';
import isEqual from 'lodash/isEqual';
import inside from 'point-in-polygon';
import { configShape, locationShape } from '../../util/shapes';
import storeOrigin from '../../action/originActions';
import storeDestination from '../../action/destinationActions';
import {
  getPathWithEndpointObjects,
  parseLocation,
  definesItinerarySearch,
  PREFIX_ITINERARY_SUMMARY
} from '../../util/path';
import Geomover from '../../component/Geomover';
import scrollTop from '../../util/scroll';
import { importLazy } from '../../component/LazilyLoad';
import {
  checkPositioningPermission,
  startLocationWatch
} from '../../action/PositionActions';
import FilterContainer from '../../component/amporto/filter';

const modules = {
  OverlayWithSpinner: () =>
    importLazy(import('../../component/visual/OverlayWithSpinner')),
  FavouritesContainer: () =>
    importLazy(import('../../component/FavouritesContainer')),
  DatetimepickerContainer: () =>
    importLazy(import('../../component/DatetimepickerContainer'))
};

class ExplorePage extends React.Component {
  static contextTypes = {
    intl: intlShape.isRequired,
    executeAction: PropTypes.func.isRequired,
    getStore: PropTypes.func.isRequired,
    router: routerShape.isRequired,
    match: matchShape.isRequired,
    config: configShape.isRequired
  };

  static propTypes = {
    origin: locationShape.isRequired,
    destination: locationShape.isRequired,
    lang: PropTypes.string,
    // eslint-disable-next-line
    query: PropTypes.object.isRequired,
    favouriteModalAction: PropTypes.string,
    fromMap: PropTypes.string,
    locationState: locationShape.isRequired
  };

  static defaultProps = {
    lang: 'pt',
    favouriteModalAction: '',
    fromMap: undefined
  };

  constructor(props, context) {
    super(props, context);
  }

  componentDidMount() {
    const { from } = this.context.match.params;
    /* initialize stores from URL params */
    const origin = parseLocation(from);

    this.context.executeAction(storeOrigin, {});
    this.context.executeAction(storeDestination, {});

    if (this.context.config.startSearchFromUserLocation && !origin.lat) {
      checkPositioningPermission().then(permission => {
        if (
          permission.state === 'granted' &&
          this.props.locationState.status === 'no-location'
        ) {
          this.context.executeAction(startLocationWatch);
        }
      });
    }
    scrollTop();
  }

  componentDidUpdate() {
    const { origin, destination } = this.props;

    if (this.pendingOrigin && isEqual(this.pendingOrigin, origin)) {
      delete this.pendingOrigin;
    }
    if (
      this.pendingDestination &&
      isEqual(this.pendingDestination, destination)
    ) {
      delete this.pendingDestination;
    }
    if (this.pendingOrigin || this.pendingDestination) {
      // not ready for navigation yet
      return;
    }

    const { router, match, config } = this.context;
    const { location } = match;

    const currentLocation =
      config.startSearchFromUserLocation &&
      !this.props.origin.address &&
      this.props.locationState?.hasLocation &&
      this.props.locationState;
    if (currentLocation && !currentLocation.isReverseGeocodingInProgress) {
      const originPoint = [currentLocation.lon, currentLocation.lat];
      if (inside(originPoint, config.areaPolygon)) {
        this.context.executeAction(storeOrigin, currentLocation);
      }
    }

    if (definesItinerarySearch(origin, destination)) {
      const newLocation = {
        ...location,
        pathname: getPathWithEndpointObjects(
          origin,
          destination,
          PREFIX_ITINERARY_SUMMARY
        ),
      };
      if (newLocation.query.time === undefined) {
        newLocation.query.time = Math.floor(Date.now() / 1000).toString();
      }
      delete newLocation.query.setTime;

      router.push(newLocation);
    } else {
      const path = getPathWithEndpointObjects(
        origin,
        destination,
        config.indexPath,
        'explore'
      );
      if (path !== location.pathname) {
        const newLocation = {
          ...location,
          pathname: path
        };

        router.replace(newLocation);
      }
    }
  }

  render() {
    return (
      <div className="explore">
        Explore page
        <FilterContainer />
      </div>
    );
  }
}

const ExplorePageWithStores = connectToStores(
  ExplorePage,
  ['OriginStore', 'DestinationStore', 'PositionStore', 'PreferencesStore'],
  (context, props) => {
    const origin = context.getStore('OriginStore').getOrigin();
    const destination = context.getStore('DestinationStore').getDestination();
    const locationState = context.getStore('PositionStore').getLocationState();

    const { location } = props.match;
    const newProps = {};
    const { query } = location;
    const { favouriteModalAction, fromMap } = query;
    newProps.locationState = locationState;

    if (favouriteModalAction) {
      newProps.favouriteModalAction = favouriteModalAction;
    }
    if (fromMap === 'origin' || fromMap === 'destination') {
      newProps.fromMap = fromMap;
    }
    newProps.origin = origin;
    newProps.destination = destination;
    newProps.lang = context.getStore('PreferencesStore').getLanguage();
    newProps.query = query;

    return newProps;
  }
);

ExplorePageWithStores.contextTypes = {
  ...ExplorePageWithStores.contextTypes,
  executeAction: PropTypes.func.isRequired,
  config: configShape.isRequired
};

export default Geomover(ExplorePageWithStores);
