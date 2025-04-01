import React from 'react';
import { useSelectedEvent } from './useSelectedEvent';
import DetailsMap from '../detailsMap';

const EventDetailsPageMap = () => (
  <DetailsMap useSelectedData={useSelectedEvent} dataType="events" />
);

export default EventDetailsPageMap;
