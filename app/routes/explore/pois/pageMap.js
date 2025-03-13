import React from 'react';
import { useSelectedPoi } from './useSelectedPoi';
import DetailsMap from '../../../component/amporto/pages/details-map';

const PoiDetailsPageMap = () => (
  <DetailsMap useSelectedData={useSelectedPoi} dataType="pois" />
);

export default PoiDetailsPageMap;
