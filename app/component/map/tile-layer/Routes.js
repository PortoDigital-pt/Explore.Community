/* eslint-disable no-continue */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';
import { isExploreFeatureEnabled } from '../../../util/mapLayerUtils';
import { drawRoutesIcon } from '../../../util/mapIconUtils';

const isValidDataProvider = (providersString, currentProvider) =>
  providersString.split(',').includes(currentProvider);

const isDifficultyOn = (layer, { properties }) => {
  return layer[`others-difficulty-${properties.difficulty}`] || false;
};

const isDurationRangeOn = (configFilters, layer, { properties }) => {
  const { durationrange } = properties;
  const { routes } = configFilters;

  const keyFromValue = Object.keys(routes).find(
    key =>
      routes[key]?.pt === durationrange || routes[key]?.en === durationrange
  );

  return layer[keyFromValue] || false;
};

const tileTypeToMapLayerName = type =>
  type === 'tourist_trips' ? 'routes' : type;
class Routes {
  constructor(tile, config, mapLayers) {
    this.tile = tile;
    this.config = config;
    this.mapLayers = mapLayers;
  }

  static getName = () => 'routes';

  getPromise() {
    fetch(
      `${this.config.URL.EXPLORE_TILES.default}/${
        this.tile.coords.z + (this.tile.props.zoomOffset || 0)
      }/${this.tile.coords.x}/${this.tile.coords.y}.pbf`
    ).then(res => {
      if (res.status !== 200) {
        return undefined;
      }

      return res.arrayBuffer().then(
        // eslint-disable-next-line consistent-return
        buf => {
          const vt = new VectorTile(new Protobuf(buf));
          this.features = [];

          Object.entries(vt.layers).forEach(([tileType, layer]) => {
            const type = tileTypeToMapLayerName(tileType);

            if (!isExploreFeatureEnabled(type, this.mapLayers)) {
              return;
            }

            for (let i = 0, ref = layer.length - 1; i <= ref; i++) {
              const feature = layer.feature(i);

              if (
                !isDifficultyOn(this.mapLayers.routes, feature) ||
                !isDurationRangeOn(
                  this.config.filters,
                  this.mapLayers.routes,
                  feature
                )
              ) {
                continue;
              }

              if (
                !isValidDataProvider(
                  this.config.ngsi.dataProvider[type],
                  feature.properties.data_provider
                )
              ) {
                continue;
              }

              feature.type = type;
              [[feature.geom]] = feature.loadGeometry();
              this.features.push(pick(feature, ['geom', 'properties', 'type']));
              const isHighlighted = this.tile.hilightedStops?.includes(
                feature.properties.id
              );

              drawRoutesIcon(
                this.tile,
                feature.geom,
                type,
                this.config.colors.iconColors,
                isHighlighted
              );
            }
          });
        },
        err => console.log(err)
      );
    });
  }
}

export default Routes;
