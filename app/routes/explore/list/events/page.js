import React from 'react';
import List from '../list';
import { getEventList } from '../../../../util/amporto/api';

const EventListPage = () => (
  <List
    type="events"
    getData={getEventList}
    errorMessage="events-fetch-error"
    emptyMessage="events-empty"
  />
);

export default EventListPage;
