import React from 'react';
import List from '../list';
import { getDistrictList } from '../../../../util/amporto/api';

const DistrictListPage = () => (
  <List
    type="districts"
    getData={getDistrictList}
    errorMessage="routes-fetch-error"
    emptyMessage="routes-empty"
    requireCategories={false}
  />
);

export default DistrictListPage;
