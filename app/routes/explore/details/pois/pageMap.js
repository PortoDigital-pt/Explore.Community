import React from 'react';
import { useSelectedPoi } from './useSelectedPoi';
import DetailsMap from '../detailsMap';

const PoiDetailsPageMap = () => (
  <DetailsMap useSelectedData={useSelectedPoi} dataType="pois" />
);

export default PoiDetailsPageMap;
