import React, { useEffect } from 'react';
import { string, func } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import Map from '../../../../component/map/MapContainer';
import Loading from '../../../../component/Loading';
import { getDistrictById } from '../../../../util/amporto/api';
import useSelectedData from '../../../../hooks/useSelectedData';
import { setupMapLayerStore } from '../../../../action/MapLayerActions';

const DistrictDetailsPageMap = (
  { language, mapLayers },
  { match, executeAction }
) => {
  useEffect(() => {
    executeAction(setupMapLayerStore);
  }, []);

  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language,
    getDataById: getDistrictById
  });

  if (error) {
    return null;
  }

  if (!selectedData) {
    return <Loading />;
  }

  return (
    <Map
      className="flex-grow"
      lat={selectedData?.lat}
      lon={selectedData?.lon}
      zoom={14}
      mapLayers={{ filter: { pois: selectedData.pois }, ...mapLayers }}
      fixedSizeIcon
      showExplore
      ignoreMinZoom
    />
  );
};

DistrictDetailsPageMap.contextTypes = {
  match: matchShape.isRequired,
  executeAction: func.isRequired
};

DistrictDetailsPageMap.propTypes = {
  language: string.isRequired,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  DistrictDetailsPageMap,
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: {
      ...getStore('MapLayerStore').getFilterLayers({ only: 'pois' }),
      ...getStore('MapLayerStore').getFilterLayers({ only: 'events' })
    }
  })
);
