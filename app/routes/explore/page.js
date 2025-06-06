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
import BlocksSection from './sections/blocks';

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
        <RoutesSection />
        <BlocksSection />
        <EventsSection />
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
