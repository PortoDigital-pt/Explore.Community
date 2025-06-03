import React, { useMemo } from 'react';
import { string } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { configShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import MapWithTracking from '../../../../component/map/MapWithTracking';
import useListData from '../../../../hooks/useListData';
import { getBlockList } from '../../../../util/amporto/api';
import { boundWithMinimumArea } from '../../../../util/geo-utils';
import Loading from '../../../../component/Loading';

const getBounds = data => boundWithMinimumArea(data.map(({ lat, lon }) => [lat, lon]));

const BlockListMap = ({ mapLayers, language }) => {
  const args = useMemo(() => ({ language }), [language]);

  const { data, error } = useListData({
    getData: getBlockList,
    args
  });

  if (error) {
    return null;
  }

   if (!data) {
    return <Loading />;
  }
  
  return (
    <MapWithTracking
      bounds={getBounds(data)}
      mapLayers={mapLayers}
      showBlocks
      ignoreMinZoom
    />
  );
};

BlockListMap.contextTypes = {
  config: configShape.isRequired
};

BlockListMap.propTypes = {
  language: string,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  BlockListMap,
  ['MapLayerStore', 'PreferencesStore'],
  ({ getStore }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: 'blocks' }),
    language: getStore('PreferencesStore').getLanguage()
  })
);
