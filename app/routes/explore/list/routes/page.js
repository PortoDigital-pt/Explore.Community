import React from 'react';
import List from '../list';
import { getTouristTripList } from '../../../../util/amporto/api';

const RouteListPage = () => (
  <List
    type="touristTrips"
    getData={getTouristTripList}
    errorMessage="pois-fetch-error"
    emptyMessage="pois-empty"
  />
);

export default RouteListPage;
