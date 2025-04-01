import React from 'react';
import { string, func } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { mapLayerShape } from '../../../store/MapLayerStore';
import MapWithTracking from '../../../component/map/MapWithTracking';
import Loading from '../../../component/Loading';
import MapRoutingButton from '../../../component/MapRoutingButton';

const DetailsPageMap = (
  { language, mapLayers, useSelectedData, dataType },
  { match }
) => {
  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language
  });

  if (error) {
    return null;
  }

  if (!selectedData) {
    return <Loading />;
  }

  return (
    <MapWithTracking
      hilightedStops={[selectedData.id]}
      zoom={18}
      lat={selectedData.lat}
      lon={selectedData.lon}
      mapLayers={mapLayers}
      topButtons={
        <MapRoutingButton stop={{ type: dataType, ...selectedData }} />
      }
      showExplore
    />
  );
};

DetailsPageMap.contextTypes = {
  match: matchShape.isRequired
};

DetailsPageMap.propTypes = {
  language: string.isRequired,
  mapLayers: mapLayerShape.isRequired,
  useSelectedData: func.isRequired,
  dataType: string.isRequired
};

export default connectToStores(
  DetailsPageMap,
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: getStore('MapLayerStore').getMapLayers()
  })
);
