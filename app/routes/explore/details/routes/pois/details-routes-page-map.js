import React, { useContext, useEffect, useState } from 'react';
import { string, func, number } from 'prop-types';
import { matchShape } from 'found';
import { connectToStores } from 'fluxible-addons-react';
import { fetchQuery, ReactRelayContext } from 'react-relay';
import MapWithTracking from '../../../../../component/map/MapWithTracking';
import Loading from '../../../../../component/Loading';
import useSelectedData from '../../../../../hooks/useSelectedData';
import ItineraryLine from '../../../../../component/map/ItineraryLine';
import planConnection from '../../../../../component/itinerary/PlanConnection';
import { buildPlanQuery } from '../util';
import LocationMarker from '../../../../../component/map/LocationMarker';

const DetailsRoutesPageMap = (
  { language, getDataById, selectedItem },
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
    selectedData?.pois?.forEach(poi => {
      leafletObjs.push(
        <LocationMarker
          key={`marker_${poi.item}`}
          position={{
            lat: poi.lat,
            lon: poi.lon
          }}
          type="poi"
          iconText={poi.position}
          highlight={selectedItem + 1 === poi.position}
        />
      );
    });

    legs?.forEach(leg => {
      leafletObjs.push(
        <ItineraryLine
          key={`leg_${leg.to?.name}`}
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
      zoom={15}
      lat={selectedData?.lat}
      lon={selectedData?.lon}
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
  selectedItem: number.isRequired
};

export default connectToStores(
  DetailsRoutesPageMap,
  ['PreferencesStore', 'MapLayerStore', 'RoutesStore'],
  ({ getStore }) => ({
    language: getStore('PreferencesStore').getLanguage(),
    mapLayers: getStore('MapLayerStore').getMapLayers(),
    selectedItem: getStore('RoutesStore').getSelectedItem()
  })
);
