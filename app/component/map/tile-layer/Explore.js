import { VectorTile } from '@mapbox/vector-tile';
import Protobuf from 'pbf';
import pick from 'lodash/pick';
import { isExploreFeatureEnabled } from '../../../util/mapLayerUtils';
import { drawExploreIcon } from '../../../util/mapIconUtils';

class Explore {
  constructor(tile, config, mapLayers) {
    this.tile = tile;
    this.config = config;
    this.mapLayers = mapLayers;
  }

  static getName = () => 'explore';

  getPromise() {
    fetch(
      `${this.config.URL.POI_MAP.default}` +
        `${this.tile.coords.z + (this.tile.props.zoomOffset || 0)}/` +
        `${this.tile.coords.x}/${this.tile.coords.y}.pbf`
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
              feature.type = type;
              [[feature.geom]] = feature.loadGeometry();
              this.features.push(pick(feature, ['geom', 'properties', 'type']));

              drawExploreIcon(
                this.tile,
                feature.geom,
                type,
                this.config.colors.iconColors
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
