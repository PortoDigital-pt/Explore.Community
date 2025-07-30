import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import { graphql, fetchQuery } from 'react-relay';
import pick from 'lodash/pick';

import { isBrowser } from '../../../util/browser';
import {
  getMapIconScale,
  drawCitybikeIcon,
  drawSmallVehicleRentalMarker
} from '../../../util/mapIconUtils';
import { showScooterNetwork } from '../../../util/modeUtils';

import {
  getRentalNetworkConfig,
  getRentalNetworkIcon,
  getVehicleCapacity,
  BIKEAVL_UNKNOWN
} from '../../../util/vehicleRentalUtils';
import { fetchWithLanguageAndSubscription } from '../../../util/fetchUtils';
import { getLayerBaseUrl } from '../../../util/mapLayerUtils';

const query = graphql`
  query ScooterRentalStationsQuery($id: String!) {
    station: vehicleRentalStation(id: $id) {
      availableVehicles {
        total
      }
      operative
    }
  }
`;

const REALTIME_REFETCH_FREQUENCY = 60000; // 60 seconds

class ScooterRentalStations {
  constructor(tile, config, mapLayers, relayEnvironment) {
    this.tile = tile;
    this.config = config;
    this.relayEnvironment = relayEnvironment;
    this.scaleratio = (isBrowser && window.devicePixelRatio) || 1;
    this.citybikeImageSize =
      20 * this.scaleratio * getMapIconScale(this.tile.coords.z);
    this.availabilityImageSize =
      14 * this.scaleratio * getMapIconScale(this.tile.coords.z);
    this.timeOfLastFetch = undefined;
    this.canHaveStationUpdates = true;

    this.featuresMap = new Map(); // Internal map for efficient lookups
    this.lastAvailabilityMap = new Map(); // stationId -> availability
  }

  // Expose features as an array for TileContainer compatibility
  get features() {
    return Array.from(this.featuresMap.values());
  }

  getPromise = lang => this.fetchAndDraw(lang);

  fetchAndDraw = lang => {
    const zoomedIn =
      this.tile.coords.z > this.config.vehicleRental.cityBikeSmallIconZoom;
    const baseUrl = zoomedIn
      ? getLayerBaseUrl(this.config.URL.REALTIME_RENTAL_STATION_MAP, lang)
      : getLayerBaseUrl(this.config.URL.RENTAL_STATION_MAP, lang);
    const tileUrl = `${baseUrl}${
      this.tile.coords.z + (this.tile.props.zoomOffset || 0)
    }/${this.tile.coords.x}/${this.tile.coords.y}.pbf`;
    return fetchWithLanguageAndSubscription(tileUrl, this.config, lang)
      .then(res => {
        this.timeOfLastFetch = Date.now();
        if (res.status !== 200) {
          return undefined;
        }

        return res.arrayBuffer().then(
          buf => {
            const vt = new VectorTile(new Protobuf(buf));

            const layer =
              vt.layers.rentalStations || vt.layers.realtimeRentalStations;

            if (layer) {
              for (let i = 0, ref = layer.length - 1; i <= ref; i++) {
                const feature = layer.feature(i);
                [[feature.geom]] = feature.loadGeometry();

                if (
                  this.shouldShowStation(
                    feature.properties.id,
                    feature.properties.network
                  )
                ) {
                  const { id, vehiclesAvailable } = feature.properties;
                  const previousAvailability = this.lastAvailabilityMap.get(id);

                  // drawing the first time and then evaluating the need for a rerendering by checking
                  // if the availability has changed when station is updated
                  if (
                    previousAvailability === undefined ||
                    previousAvailability !== vehiclesAvailable
                  ) {
                    feature.properties.draw = true;
                    this.featuresMap.set(
                      id,
                      pick(feature, ['geom', 'properties'])
                    );
                    this.lastAvailabilityMap.set(id, vehiclesAvailable);
                  }
                }
              }
            }

            this.canHaveStationUpdates = zoomedIn;
            this.featuresMap.forEach(feature => this.draw(feature, zoomedIn));
          },
          err => console.log(err) // eslint-disable-line no-console
        );
      })
      .catch(err => {
        this.timeOfLastFetch = Date.now();
        console.log(err); // eslint-disable-line no-console
      });
  };

  draw = (feature, zoomedIn) => {
    const { id, network, formFactors, draw } = feature.properties;

    if (!draw) {
      return;
    }

    const iconName = getRentalNetworkIcon(
      getRentalNetworkConfig(network, this.config)
    );
    const isHilighted = this.tile.hilightedStops?.includes(id);

    if (zoomedIn) {
      this.drawLargeIcon(feature, iconName, isHilighted);
    } else if (isHilighted) {
      this.canHaveStationUpdates = true;
      this.drawHighlighted(feature, iconName);
    } else {
      this.drawSmallMarker(feature.geom, iconName, formFactors);
    }

    feature.properties.draw = false;
    this.featuresMap.set(id, feature);
  };

  drawLargeIcon = (
    { geom, properties: { network, operative, vehiclesAvailable } },
    iconName,
    isHilighted
  ) => {
    const citybikeCapacity = getVehicleCapacity(this.config, network);

    drawCitybikeIcon(
      this.tile,
      geom,
      operative,
      vehiclesAvailable,
      iconName,
      citybikeCapacity !== BIKEAVL_UNKNOWN,
      isHilighted
    );
  };

  drawHighlighted = ({ geom, properties: { id, network } }, iconName) => {
    const citybikeCapacity = getVehicleCapacity(this.config, network);
    const callback = ({ station: result }) => {
      if (result) {
        drawCitybikeIcon(
          this.tile,
          geom,
          result.operative,
          result.availableVehicles.total,
          iconName,
          citybikeCapacity !== BIKEAVL_UNKNOWN,
          true
        );
      }
      return this;
    };

    fetchQuery(this.relayEnvironment, query, { id }, { force: true })
      .toPromise()
      .then(callback);
  };

  drawSmallMarker = (geom, iconName, formFactor) => {
    const citybikeIconColor =
      iconName.includes('secondary') &&
      this.config.colors.iconColors['mode-citybike-secondary']
        ? this.config.colors.iconColors['mode-citybike-secondary']
        : this.config.colors.iconColors['mode-citybike'];
    const iconColor =
      formFactor === 'SCOOTER'
        ? this.config.colors.iconColors['mode-scooter']
        : citybikeIconColor;
    drawSmallVehicleRentalMarker(this.tile, geom, iconColor, formFactor);
  };

  onTimeChange = lang => {
    const currentTime = Date.now();
    if (
      this.canHaveStationUpdates &&
      (!this.timeOfLastFetch ||
        currentTime - this.timeOfLastFetch > REALTIME_REFETCH_FREQUENCY)
    ) {
      this.fetchAndDraw(lang);
    }
  };

  shouldShowStation = (id, network) =>
    this.config.vehicleRental.networks[network] &&
    (this.config.vehicleRental.networks[network].showRentalStations ===
      undefined ||
      this.config.vehicleRental.networks[network].showRentalStations) &&
    (!this.tile.stopsToShow || this.tile.stopsToShow.includes(id)) &&
    !this.tile.objectsToHide.vehicleRentalStations.includes(id) &&
    showScooterNetwork(this.config.vehicleRental.networks[network]);

  cleanup = () => {
    this.lastAvailabilityMap.clear();
    this.featuresMap.clear();
    this.canHaveStationUpdates = false;
  };

  static getName = () => 'scooters';
}

export default ScooterRentalStations;
