import React from 'react';
import { getPoiById } from '../../../../util/amporto/api';
import DetailsMap from '../detailsMap';

const PoiDetailsPageMap = () => <DetailsMap getDataById={getPoiById} />;

export default PoiDetailsPageMap;
