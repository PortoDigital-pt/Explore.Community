import PropTypes from 'prop-types';
import React from 'react';
import { intlShape } from 'react-intl';
import { matchShape, routerShape } from 'found';
import connectToStores from 'fluxible-addons-react/connectToStores';
import { configShape, locationShape } from '../../util/shapes';
import Geomover from '../../component/Geomover';
import {
  checkPositioningPermission,
  startLocationWatch
} from '../../action/PositionActions';
import Filters from '../../component/amporto/filter';
import PoisSection from './sections/pois';
import EventsSection from './sections/events';
import RoutesSection from './sections/routes';
import DistrictsSection from './sections/districts';

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
    // eslint-disable-next-line
    query: PropTypes.object.isRequired,
    locationState: locationShape.isRequired
  };

  componentDidMount() {
    checkPositioningPermission().then(permission => {
      if (
        permission.state === 'granted' &&
        this.props.locationState.status === 'no-location'
      ) {
        this.context.executeAction(startLocationWatch);
      }
    });
  }

  render() {
    return (
      <div className="explore">
        <Filters />
        <PoisSection />
        {this.context.config.optionalNavigationItems.routes && (
          <RoutesSection />
        )}
        {this.context.config.optionalNavigationItems.districts && (
          <DistrictsSection />
        )}
        <EventsSection />
      </div>
    );
  }
}

const ExplorePageWithStores = connectToStores(
  ExplorePage,
  ['OriginStore', 'DestinationStore', 'PositionStore', 'PreferencesStore'],
  (context, props) => {
    const locationState = context.getStore('PositionStore').getLocationState();

    const { location } = props.match;
    const newProps = {};
    const { query } = location;
    newProps.locationState = locationState;
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
