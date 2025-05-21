import React, { useContext, useEffect, useState } from 'react';
import { string, func } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { fetchQuery, ReactRelayContext } from 'react-relay';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import MapWithTracking from '../../../../component/map/MapWithTracking';
import Loading from '../../../../component/Loading';
import MapRoutingButton from '../../../../component/MapRoutingButton';
import useSelectedData from '../../../../hooks/useSelectedData';
import ItineraryLine from '../../../../component/map/ItineraryLine';
import planConnection from '../../../../component/itinerary/PlanConnection';
import { buildPlanQuery } from './util';
import LocationMarker from '../../../../component/map/LocationMarker';

const DetailsRoutesPageMap = (
  { language, mapLayers, getDataById },
  { match }
) => {
  const [legs, setLegs] = useState([]);

  const { environment } = useContext(ReactRelayContext);

  const { selectedData, error } = useSelectedData({
    id: match.params.id,
    language,
    getDataById
  });

  const getDataFromOTP = async (environment, pois) => {
    const queries = buildPlanQuery(pois);

    const asyncOperations = [];
    queries.forEach(query => {
      asyncOperations.push(
        fetchQuery(environment, planConnection, query, {
          force: true
        }).toPromise()
      );
    });

    const results = await Promise.all(asyncOperations);

    const legList = results.map(result => result.plan?.edges[0]?.node?.legs[0]);
    setLegs(legList);
  };

  useEffect(() => {
    getDataFromOTP(environment, selectedData?.pois);
  }, [environment, selectedData?.pois]);

  if (error) {
    return null;
  }

  if (!selectedData) {
    return <Loading />;
  }

  const leafletObjs = [];

  if (legs) {
    selectedData?.pois?.forEach((poi, i) => {
      leafletObjs.push(
        <LocationMarker
          key={`marker_${i}`}
          position={{
            lat: poi.lat,
            lon: poi.lon
          }}
          type="poi"
          iconText={poi.position}
        />
      );
    });

    legs?.forEach((leg, i) => {
      leafletObjs.push(
        <ItineraryLine
          key={`line_${i}`}
          hash={0}
          streetMode={0}
          legs={[leg]}
          showTransferLabels={false}
          showIntermediateStops
          showDurationBubble={false}
        />
      );
    });
  }

  return (
    <MapWithTracking
      leafletObjs={leafletObjs}
      hilightedStops={[selectedData.id]}
      zoom={14}
      lat={selectedData?.lat}
      lon={selectedData?.lon}
      // mapLayers={mapLayers}
      topButtons={<MapRoutingButton stop={selectedData} />}
      showExplore
    />
  );
};

DetailsRoutesPageMap.contextTypes = {
  match: matchShape.isRequired
};

DetailsRoutesPageMap.propTypes = {
  getDataById: func.isRequired,
  language: string.isRequired,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  DetailsRoutesPageMap,
  ['PreferencesStore', 'MapLayerStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: getStore('MapLayerStore').getMapLayers()
  })
);
