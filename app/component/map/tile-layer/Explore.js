/* eslint-disable camelcase */
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';
import {
  isExploreFeatureEnabled,
  isCategoryEnabled
} from '../../../util/mapLayerUtils';
import {
  drawExploreIcon,
  getFixedSizeIconStyle
} from '../../../util/mapIconUtils';

const isValidDataProvider = (providersString, currentProvider) =>
  providersString.split(',').includes(currentProvider);

const mapCategoryDescriptionToId = (filters, type, { properties }) => {
  const { category_lang = '{}', section_lang = '{}' } = properties;
  const value =
    type === 'pois'
      ? JSON.parse(category_lang).pt
      : JSON.parse(section_lang).pt;

  const [categoryKey] = Object.entries(filters[type]).find(
    // eslint-disable-next-line no-unused-vars
    ([_, { pt }]) => (Array.isArray(value) ? value.includes(pt) : pt === value)
  ) ?? [null];

  return categoryKey;
};

class Explore {
  constructor(tile, config, mapLayers) {
    this.tile = tile;
    this.config = config;
    this.mapLayers = mapLayers;
  }

  static getName = () => 'explore';

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

          Object.entries(vt.layers).forEach(([type, layer]) => {
            if (!isExploreFeatureEnabled(type, this.mapLayers)) {
              return;
            }

            for (let i = 0, ref = layer.length - 1; i <= ref; i++) {
              const feature = layer.feature(i);
              const canBeDrawed =
                !this.mapLayers.filter?.[type] ||
                this.mapLayers.filter[type].includes(feature.properties.id);
              const customSize = this.mapLayers.filter?.[type]
                ? getFixedSizeIconStyle()
                : null;

              if (!canBeDrawed) {
                // eslint-disable-next-line no-continue
                continue;
              }

              if (
                type !== 'accesspoints' &&
                !isCategoryEnabled(
                  type,
                  this.mapLayers,
                  mapCategoryDescriptionToId(this.config.filters, type, feature)
                )
              ) {
                // eslint-disable-next-line no-continue
                continue;
              }

              if (
                type !== 'accesspoints' &&
                !isValidDataProvider(
                  this.config.ngsi.dataProvider[type],
                  feature.properties.data_provider
                )
              ) {
                // eslint-disable-next-line no-continue
                continue;
              }

              feature.type = type;
              [[feature.geom]] = feature.loadGeometry();
              this.features.push(pick(feature, ['geom', 'properties', 'type']));
              const isHighlighted = this.tile.hilightedStops?.includes(
                feature.properties.id
              );

              drawExploreIcon(
                this.tile,
                feature.geom,
                type,
                this.config.colors.iconColors,
                isHighlighted,
                customSize
              );
            }
          });
        },
        err => console.log(err) // eslint-disable-line no-console
      );
    });
  }
}

export default Explore;
