import React from 'react';
import { string } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { mapLayerShape } from '../../../store/MapLayerStore';
import MapWithTracking from '../../../component/map/MapWithTracking';
import Loading from '../../../component/Loading';
import MapRoutingButton from '../../../component/MapRoutingButton';
import { useSelectedPoi } from './useSelectedPoi';

const PageMap = ({ language, mapLayers }, { match }) => {
  const { selectedData, error } = useSelectedPoi({
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
      topButtons={<MapRoutingButton stop={{ type: 'pois', ...selectedData }} />}
      showExplore
    />
  );
};

PageMap.contextTypes = {
  match: matchShape.isRequired
};

PageMap.propTypes = {
  language: string.isRequired,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  PageMap,
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: getStore('MapLayerStore').getMapLayers()
  })
);
