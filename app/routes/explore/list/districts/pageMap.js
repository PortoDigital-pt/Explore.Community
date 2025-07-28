import React, { useMemo } from 'react';
import { string } from 'prop-types';
import { connectToStores } from 'fluxible-addons-react';
import { configShape } from '../../../../util/shapes';
import { mapLayerShape } from '../../../../store/MapLayerStore';
import Map from '../../../../component/map/MapContainer';
import useListData from '../../../../hooks/useListData';
import { getDistrictList } from '../../../../util/amporto/api';
import { boundWithMinimumArea } from '../../../../util/geo-utils';
import Loading from '../../../../component/Loading';

const getBounds = data =>
  boundWithMinimumArea(data.map(({ lat, lon }) => [lat, lon]));

const DistrictListMap = ({ mapLayers, language }) => {
  const args = useMemo(() => ({ language }), [language]);

  const { data, error } = useListData({
    getData: getDistrictList,
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
      mapLayers={mapLayers}
      showDistricts
      ignoreMinZoom
    />
  );
};

DistrictListMap.contextTypes = {
  config: configShape.isRequired
};

DistrictListMap.propTypes = {
  language: string,
  mapLayers: mapLayerShape.isRequired
};

export default connectToStores(
  DistrictListMap,
  ['MapLayerStore', 'PreferencesStore'],
  ({ getStore }) => ({
    mapLayers: getStore('MapLayerStore').getFilterLayers({ only: 'districts' }),
    language: getStore('PreferencesStore').getLanguage()
  })
);
