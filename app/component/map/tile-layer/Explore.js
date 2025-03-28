/* eslint-disable camelcase */
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';
import {
  isExploreFeatureEnabled,
  isCategoryEnabled
} from '../../../util/mapLayerUtils';
import { drawExploreIcon } from '../../../util/mapIconUtils';

const mapCategoryDescriptionToId = (
  filters,
  type,
  { properties: { category_lang, category } }
) => {
  let value = category;

  if (category_lang) {
    value = decodeURIComponent(JSON.parse(category_lang).pt);
  }

  const [categoryKey] = Object.entries(filters[type]).find(
    // eslint-disable-next-line no-unused-vars
    ([_, { pt }]) => pt === value
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

              //  due to data inconsistency
              if (
                feature.properties.data_provider ===
                'http:%2F%2Fwww.portoenorte.pt%2Fapi%2Fv1'
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
                isHighlighted
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
