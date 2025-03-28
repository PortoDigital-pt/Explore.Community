import { useState, useEffect } from 'react';
import { getEventById } from '../../../util/amporto/api';

export const useSelectedEvent = ({ id, language }) => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventById(id)
      .then(event => setSelectedEvent({ ...event, type: 'events' }))
      .catch(setError);
  }, [id]);

  return { selectedData: selectedEvent, error };
};
