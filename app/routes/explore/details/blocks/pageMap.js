import React, { useMemo, useEffect } from 'react';
import { string, func } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import Map from '../../../../component/map/MapContainer';
import Loading from '../../../../component/Loading';
import { getPoiList, getBlockById } from '../../../../util/amporto/api';
import { boundWithMinimumArea } from '../../../../util/geo-utils';
import useListData from '../../../../hooks/useListData';
import useSelectedData from '../../../../hooks/useSelectedData';
import { setupMapLayerStore } from '../../../../action/MapLayerActions';

const getBounds = data =>
  boundWithMinimumArea(data.map(({ lat, lon }) => [lat, lon]));

const BlockDetailsPageMap = (
  { language, mapLayers },
  { match, executeAction }
) => {
  useEffect(() => {
    executeAction(setupMapLayerStore);
  }, []);

  const args = useMemo(
    () => ({ language, block: match.params.id }),
    [language, match.params.id]
  );

  const { selectedData } = useSelectedData({
    id: match.params.id,
    language,
    getDataById: getBlockById
  });

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
    <Map
      className="flex-grow"
      bounds={getBounds(data)}
      lat={selectedData?.lat}
      lon={selectedData?.lon}
      zoom={14}
      mapLayers={{ filter: { pois: data.map(({ id }) => id) }, ...mapLayers }}
      showExplore
    />
  );
};

BlockDetailsPageMap.contextTypes = {
  match: matchShape.isRequired,
  executeAction: func.isRequired
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
    mapLayers: {
      ...getStore('MapLayerStore').getFilterLayers({ only: 'pois' }),
      ...getStore('MapLayerStore').getFilterLayers({ only: 'events' })
    }
  })
);
