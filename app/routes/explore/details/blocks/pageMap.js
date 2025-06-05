import React, { useMemo } from 'react';
import { string } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import MapWithTracking from '../../../../component/map/MapWithTracking';
import Loading from '../../../../component/Loading';
import { getPoiList } from '../../../../util/amporto/api';
import { boundWithMinimumArea } from '../../../../util/geo-utils';
import useListData from '../../../../hooks/useListData';

const getBounds = data =>
  boundWithMinimumArea(data.map(({ lat, lon }) => [lat, lon]));

const BlockDetailsPageMap = ({ language, mapLayers }, { match }) => {
  const args = useMemo(
    () => ({ language, block: match.params.id }),
    [language, match.params.id]
  );

  const { data, error } = useListData({
    getData: getPoiList,
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
      mapLayers={{ filter: data.map(({ id }) => id), ...mapLayers }}
      showExplore
    />
  );
};

BlockDetailsPageMap.contextTypes = {
  match: matchShape.isRequired
};

BlockDetailsPageMap.propTypes = {
  language: string.isRequired,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  BlockDetailsPageMap,
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: 'pois' })
  })
);
