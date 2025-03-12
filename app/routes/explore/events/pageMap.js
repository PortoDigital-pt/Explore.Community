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
import { useSelectedEvent } from './useSelectedEvent';

const PageMap = ({ language, breakpoint, mapLayers }, { match }) => {
  const { selectedEvent, error } = useSelectedEvent({ id: match.params.id });

  if (error) {
    return null;
  }

  if (!selectedEvent) {
    return <Loading />;
  }

  return (
    <MapWithTracking
      hilightedStops={[selectedEvent.id]}
      zoom={18}
      lat={selectedEvent.lat}
      lon={selectedEvent.lon}
      mapLayers={mapLayers}
      topButtons={
        <MapRoutingButton stop={{ type: 'events', ...selectedEvent }} />
      }
      showExplore
    >
      {[breakpoint !== 'large' && <BackButton key={selectedEvent.id} title={selectedEvent.name} subtitle={selectedEvent.category}/>]}
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
