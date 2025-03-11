import { useState, useEffect } from 'react';
import { getEventById } from '../../../util/apiUtils';

export const useSelectedEvent = ({ id }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventById(id).then(setSelectedEvent).catch(setError);
  }, [id]);

  return { selectedEvent, error };
};
