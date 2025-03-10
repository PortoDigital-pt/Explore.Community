import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { matchShape, routerShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import {
  configShape,
  locationShape,
} from '../../util/shapes';
import { mapLayerShape } from '../../store/MapLayerStore';
import MapWithTracking from './MapWithTracking';
import SelectedStopPopup from './popups/SelectedStopPopup';
import SelectedStopPopupContent from '../SelectedStopPopupContent';
import withBreakpoint from '../../util/withBreakpoint';
import Loading from '../Loading';

function PoisPageMap(
  { breakpoint, mapLayers },
  { config, match }
) {
  const [poiData, setPoiData] = useState(null);
  
  useEffect(()=> {
    fetch(`/api/pois/${match.params.id}`)
    .then(response => response.json())
    .then(setPoiData);
  }, [match.params.id]);

  if (!poiData) {
    return <Loading />;
  }
  console.log('Poi Data: ', poiData);
  const leafletObjs = [];
/* 
  if (breakpoint === 'large') {
    leafletObjs.push(
      <SelectedStopPopup lat={stop.lat} lon={stop.lon} key="SelectedStopPopup">
        <SelectedStopPopupContent stop={stop} name={stopName} />
      </SelectedStopPopup>
    );
  }
*/
  
  return (
    <MapWithTracking
      hilightedStops={[poiData.id]}
      //leafletObjs={leafletObjs}
      zoom={18}
      lat={poiData.location.coordinates.lat}
      lon={poiData.location.coordinates.lon}
      mapLayers={mapLayers}
      showExplore
     />
  );
}

PoisPageMap.contextTypes = {
  config: configShape.isRequired,
  match: matchShape.isRequired,
  router: routerShape.isRequired,
  getStore: PropTypes.func.isRequired
};

PoisPageMap.propTypes = {
  breakpoint: PropTypes.string.isRequired,
  mapLayers: mapLayerShape.isRequired,
};

export default connectToStores(
  withBreakpoint(PoisPageMap),
  ['MapLayerStore'],
  ({ getStore }) => ({
      mapLayers: getStore('MapLayerStore').getMapLayers()
  }),
  { config: configShape }
);