import Store from 'fluxible/addons/BaseStore';
import PropTypes from 'prop-types';
import { setMapLayerSettings, getMapLayerSettings } from './localStorage';
import { showRentalVehiclesOfType } from '../util/modeUtils';
import { TransportMode } from '../constants';

class MapLayerStore extends Store {
  static handlers = {
    UpdateMapLayers: 'updateMapLayers',
    UpdateMapLayersCustom: 'updateMapLayersCustom'
  };

  static storeName = 'MapLayerStore';

  mapLayers = {
    parkAndRide: false,
    parkAndRideForBikes: false,
    stop: {
      showAll: true,
      bus: true,
      ferry: true,
      rail: true,
      subway: true,
      tram: true,
      funicular: true
    },
    terminal: {
      bus: true,
      ferry: true,
      rail: true,
      subway: true,
      tram: true
    },
    vehicles: false,
    citybike: true,
    geoJson: {},

    showExplore: true,

    pois: null,
    events: null,
    routes: null,
    accesspoints: null
  };

  constructor(dispatcher) {
    super(dispatcher);

    const { config } = dispatcher.getContext();

    this.mapLayers.pois = {
      showAll: true,
      ...Object.keys(config.filters.pois).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    };
    this.mapLayers.events = {
      showAll: true,
      ...Object.keys(config.filters.events).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    };
    this.mapLayers.routes = {
      showAll: true,
      ...Object.keys(config.filters.routes).reduce(
        (acc, key) => ({ ...acc, [key]: true }),
        {}
      )
    };
    this.mapLayers.accesspoints = { showAll: config.map.showWifi };
    this.mapLayers.citybike = showRentalVehiclesOfType(
      config.vehicleRental?.networks,
      config,
      TransportMode.Citybike
    );
    this.mapLayers.scooter =
      config.transportModes.scooter?.showIfSelectedForRouting &&
      showRentalVehiclesOfType(
        config.vehicleRental?.networks,
        config,
        TransportMode.Scooter
      );
    if (config.hideMapLayersByDefault) {
      this.mapLayers.stop = Object.keys(this.mapLayers.stop).map(() => false);

      this.mapLayers.citybike = false;
      this.mapLayers.scooter = false;
    }
    const storedMapLayers = getMapLayerSettings();
    if (Object.keys(storedMapLayers)?.length > 0) {
      this.mapLayers = {
        ...this.mapLayers,
        ...storedMapLayers,
        terminal: { ...this.mapLayers.terminal, ...storedMapLayers.terminal }
      };
    }
  }

  getMapLayers = skip => {
    if (!skip?.notThese && !skip?.force) {
      return this.mapLayers;
    }
    const layers = { ...this.mapLayers };
    if (skip.notThese) {
      skip.notThese.forEach(key => {
        if (typeof layers[key] === 'object') {
          layers[key] = {};
          Object.keys(this.mapLayers[key]).forEach(subKey => {
            layers[key][subKey] = false;
          });
        } else {
          layers[key] = false;
        }
      });
    }
    if (skip.force) {
      skip.force.forEach(key => {
        if (typeof layers[key] === 'object') {
          layers[key] = {};
          Object.keys(this.mapLayers[key]).forEach(subKey => {
            layers[key][subKey] = true;
          });
        } else {
          layers[key] = true;
        }
      });
    }
    return layers;
  };

  getFilterLayers = ({ only } = {}) => {
    const layers = {
      stop: {
        ...this.mapLayers.stop,
        citybike: this.mapLayers.citybike,
        subway: this.mapLayers.terminal.subway
      },
      pois: this.mapLayers.pois,
      events: this.mapLayers.events,
      routes: this.mapLayers.routes
    };

    if (!only) {
      return layers;
    }

    return { [only]: layers[only] };
  };

  updateMapLayersCustom = mapLayers => {
    this.mapLayers = {
      ...this.mapLayers,
      ...mapLayers,
      stop: {
        ...this.mapLayers.stop,
        ...mapLayers.stop
      },
      pois: {
        ...this.mapLayers.pois,
        ...mapLayers.pois
      },
      events: {
        ...this.mapLayers.events,
        ...mapLayers.events
      },
      routes: {
        ...this.mapLayers.routes,
        ...mapLayers.routes
      }
    };

    if (mapLayers.stop) {
      this.mapLayers.citybike = mapLayers.stop.citybike;
      this.mapLayers.terminal.subway = mapLayers.stop.subway;
    }

    setMapLayerSettings({ ...this.mapLayers });
    this.emitChange();
  };

  updateMapLayers = mapLayers => {
    this.mapLayers = {
      ...this.mapLayers,
      ...mapLayers,
      stop: {
        ...this.mapLayers.stop,
        ...mapLayers.stop
      },
      pois: {
        ...this.mapLayers.pois,
        ...mapLayers.pois
      },
      events: {
        ...this.mapLayers.events,
        ...mapLayers.events
      },
      routes: {
        ...this.mapLayers.routes,
        ...mapLayers.routes
      }
    };
    setMapLayerSettings({ ...this.mapLayers });
    this.emitChange();
  };
}

export const mapLayerShape = PropTypes.shape({
  citybike: PropTypes.bool,
  parkAndRide: PropTypes.bool,
  parkAndRideForBikes: PropTypes.bool,
  stop: PropTypes.shape({
    bus: PropTypes.bool,
    ferry: PropTypes.bool,
    rail: PropTypes.bool,
    subway: PropTypes.bool,
    tram: PropTypes.bool,
    funicular: PropTypes.bool
  }),
  terminal: PropTypes.shape({
    bus: PropTypes.bool,
    rail: PropTypes.bool,
    subway: PropTypes.bool
  }),
  vehicles: PropTypes.bool,
  // eslint-disable-next-line
  geoJson: PropTypes.object,
  scooter: PropTypes.bool
});

export default MapLayerStore;
