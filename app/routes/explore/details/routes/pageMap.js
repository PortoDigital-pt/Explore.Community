import React from 'react';
import { getRoutesById } from '../../../../util/amporto/api';
import DetailsRoutesPageMap from './pois/details-routes-page-map.js';

const RoutesDetailsPageMap = () => (
  <DetailsRoutesPageMap getDataById={getRoutesById} mapLayers={['routes']} />
);

export default RoutesDetailsPageMap;
