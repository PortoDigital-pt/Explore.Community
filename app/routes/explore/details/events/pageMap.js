import React from 'react';
import { getEventById } from '../../../../util/amporto/api';
import DetailsMap from '../detailsMap';

const EventDetailsPageMap = () => <DetailsMap getDataById={getEventById} />;

export default EventDetailsPageMap;
