import React from 'react';
import { useSelectedEvent } from './useSelectedEvent';
import DetailsMap from '../../../component/amporto/pages/details-map';

const EventDetailsPageMap = () => (
  <DetailsMap useSelectedData={useSelectedEvent} dataType="events" />
);

export default EventDetailsPageMap;
