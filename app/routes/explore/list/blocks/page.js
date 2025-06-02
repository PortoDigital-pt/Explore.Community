import React from 'react';
import List from '../list';
import { getBlockList } from '../../../../util/amporto/api';

const BlockListPage = () => (
  <List
    type="blocks"
    getData={getBlockList}
    errorMessage="routes-fetch-error"
    emptyMessage="routes-empty"
  />
);

export default BlockListPage;
