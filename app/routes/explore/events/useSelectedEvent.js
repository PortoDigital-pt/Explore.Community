import { useState, useEffect } from 'react';
import { getEventById } from '../../../util/apiUtils';

export const useSelectedEvent = ({ id }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    getEventById(id).then(setSelectedEvent);
  }, [id]);

  return selectedEvent;
};
