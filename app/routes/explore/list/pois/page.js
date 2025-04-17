import React from 'react';
import List from '../list';
import { getPoiList } from '../../../../util/amporto/api';

const PoiListPage = () => (
  <List
    type="pois"
    getData={getPoiList}
    errorMessage="pois-fetch-error"
    emptyMessage="pois-empty"
  />
);

export default PoiListPage;
