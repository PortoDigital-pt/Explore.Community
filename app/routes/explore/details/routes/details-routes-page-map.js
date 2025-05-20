import React from 'react';
import { string, func } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import MapWithTracking from '../../../../component/map/MapWithTracking';
import Loading from '../../../../component/Loading';
import MapRoutingButton from '../../../../component/MapRoutingButton';
import useSelectedData from '../../../../hooks/useSelectedData';
import ItineraryLine from '../../../../component/map/ItineraryLine';

const LEGS = [
  {
    legId: null,
    mode: 'subway',
    legGeometry: {
      points: 'ybczFrxps@yUX????aViI??'
      // points: 'kaczFlaps@FBpAt@NHEHEL?@M^?XCl@J|C@THz@BRk@XC@GEYCc@AO@C@C@A@k@tDMZGX@?v@V??',
    },
    from: {
      lat: 41.144766,
      lon: -8.607251,
      name: 'Crocodile Club-yyy'
    },
    to: {
      lat: 41.14494,
      lon: -8.610815
    }
  }
];

const DetailsRoutesPageMap = (
  { language, mapLayers, getDataById },
  { match },
) => {
  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language,
    getDataById,
  });

  if (error) {
    return null;
  }

  if (!selectedData) {
    return <Loading />;
  }

  const leafletObjs = [];
  console.log('log-selectedData', selectedData);

  leafletObjs.push(
    <ItineraryLine
      key="line_0"
      hash={0}
      streetMode={0}
      legs={LEGS}
      showTransferLabels={false}
      showIntermediateStops
      showDurationBubble={false}
    />
  );

  return (
    <MapWithTracking
      leafletObjs={leafletObjs}
      hilightedStops={[selectedData.id]}
      zoom={18}
      lat={41.144766}
      lon={-8.610815}
      // mapLayers={mapLayers}
      topButtons={<MapRoutingButton stop={selectedData} />}
      showExplore
    />
  );
};

DetailsRoutesPageMap.contextTypes = {
  match: matchShape.isRequired,
};

DetailsRoutesPageMap.propTypes = {
  getDataById: func.isRequired,
  language: string.isRequired,
  mapLayers: mapLayerShape.isRequired,
};

export default connectToStores(
  DetailsRoutesPageMap,
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: getStore('MapLayerStore').getMapLayers(),
  }),
);
