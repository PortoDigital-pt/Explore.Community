/* eslint-disable no-continue */
/* eslint-disable no-console */
/* eslint-disable camelcase */
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';
import { isExploreFeatureEnabled } from '../../../util/mapLayerUtils';
import { drawExploreIcon, drawFixedSizeIcon } from '../../../util/mapIconUtils';

const isValidDataProvider = (providersString, currentProvider) =>
  providersString.split(',').includes(currentProvider);

// If all options are false, it will work as everything is checked.
const isAllLayerUnchecked = (layer, prefix) => {
  return (
    Object.entries(layer)
      .filter(([key]) => {
        return key.startsWith(prefix);
      })
      // eslint-disable-next-line no-unused-vars
      .every(([_, value]) => value === false)
  );
};

const isDifficultyOn = (layer, { properties }) => {
  const allFalse = isAllLayerUnchecked(layer, 'others-difficulty-');

  return (
    allFalse || layer[`others-difficulty-${properties.difficulty}`] || false
  );
};

const isDurationRangeOn = (configFilters, layer, { properties }) => {
  const allFalse = isAllLayerUnchecked(layer, 'others-durationRange-');

  if (allFalse) {
    return true;
  }

  const { durationrange } = properties;
  const { routes } = configFilters;

  const keyFromValue = Object.keys(routes).find(
    key =>
      routes[key]?.pt === durationrange || routes[key]?.en === durationrange
  );

  return layer[keyFromValue] || false;
};

class Routes {
  constructor(tile, config, mapLayers) {
    this.tile = tile;
    this.config = config;
    this.mapLayers = mapLayers;
  }

  static getName = () => 'routes';

  getPromise() {
    fetch(
      `${this.config.URL.EXPLORE_TILES.default}/tourist_trips/${
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

          Object.values(vt.layers).forEach(layer => {
            const type = 'routes';

            if (!isExploreFeatureEnabled(type, this.mapLayers)) {
              return;
            }

            for (let i = 0, ref = layer.length - 1; i <= ref; i++) {
              const feature = layer.feature(i);

              if (!isDifficultyOn(this.mapLayers.routes, feature)) {
                continue;
              }

              if (
                !isDurationRangeOn(
                  this.config.filters,
                  this.mapLayers.routes,
                  feature
                ) ||
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

              const drawMethod = this.mapLayers.regularSizeIcon ? drawExploreIcon : drawFixedSizeIcon;
              drawMethod(this.tile, feature.geom, type, this.config.colors.iconColors);
            }
          });
        },
        err => console.log(err)
      );
    });
  }
}

export default Routes;
