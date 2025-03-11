import React from 'react';
import { string } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { mapLayerShape } from '../../../store/MapLayerStore';
import MapWithTracking from '../../../component/map/MapWithTracking';
import withBreakpoint from '../../../util/withBreakpoint';
import Loading from '../../../component/Loading';
import BackButton from '../../../component/BackButton';
import MapRoutingButton from '../../../component/MapRoutingButton';
import { useSelectedPoi } from './useSelectedPoi';

const PageMap = ({ language, breakpoint, mapLayers }, { match }) => {
  const { selectedPoi, error } = useSelectedPoi({ id: match.params.id, language });

  if (error) {
    return null;
  } 

  if (!selectedPoi) {
    return <Loading />;
  }

  return (
    <MapWithTracking
      hilightedStops={[selectedPoi.id]}
      zoom={18}
      lat={selectedPoi.lat}
      lon={selectedPoi.lon}
      mapLayers={mapLayers}
      topButtons={<MapRoutingButton stop={{ type: 'pois', ...selectedPoi }} />}
      showExplore
    >
      {[breakpoint !== 'large' && <BackButton key="poi-back" />]}
    </MapWithTracking>
  );
};

PageMap.contextTypes = {
  match: matchShape.isRequired
};

PageMap.propTypes = {
  breakpoint: string.isRequired,
  language: string.isRequired,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  withBreakpoint(PageMap),
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: getStore('MapLayerStore').getMapLayers()
  })
);
