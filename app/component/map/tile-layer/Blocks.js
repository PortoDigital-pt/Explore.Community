/* eslint-disable no-console */
/* eslint-disable camelcase */
import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';
import { isExploreFeatureEnabled } from '../../../util/mapLayerUtils';
import { drawBlockIcon } from '../../../util/mapIconUtils';

const isValidDataProvider = (providersString, currentProvider) =>
  providersString.split(',').includes(currentProvider);

class Blocks {
  constructor(tile, config, mapLayers) {
    this.tile = tile;
    this.config = config;
    this.mapLayers = mapLayers;
  }

  static getName = () => 'blocks';

  getPromise() {
    fetch(
      `${this.config.URL.EXPLORE_TILES.default}/poi_group/${
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

          Object.values(vt.layers).forEach((layer) => {
            const type = 'blocks';

            if (!isExploreFeatureEnabled(type, this.mapLayers)) {
              return;
            }

            for (let i = 0, ref = layer.length - 1; i <= ref; i++) {
              const feature = layer.feature(i);

              if (
                !isValidDataProvider(
                  this.config.ngsi.dataProvider.blocks,
                  feature.properties.data_provider
                )
              ) {
                // eslint-disable-next-line no-continue
                continue;
              }

              feature.type = type;
              [[feature.geom]] = feature.loadGeometry();
              this.features.push(pick(feature, ['geom', 'properties', 'type']));

              drawBlockIcon(this.tile, feature.geom, type);
            }
          });
        },
        err => console.log(err)
      );
    });
  }
}

export default Blocks;
