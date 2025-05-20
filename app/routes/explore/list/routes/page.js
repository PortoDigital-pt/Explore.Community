import React from 'react';
import List from '../list';
import { getRoutesList } from '../../../../util/amporto/api';

const RouteListPage = () => (
  <List
    type="routes"
    getData={getRoutesList}
    errorMessage="pois-fetch-error"
    emptyMessage="pois-empty"
  />
);

export default RouteListPage;
