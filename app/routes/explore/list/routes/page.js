import React from 'react';
import List from '../list';
import { getRoutesList } from '../../../../util/amporto/api';

const RouteListPage = () => (
  <List
    type="routes"
    getData={getRoutesList}
    errorMessage="routes-fetch-error"
    emptyMessage="routes-empty"
  />
);

export default RouteListPage;
