import { useState, useEffect } from 'react';
import { getEventsList } from '../../../../util/apiUtils';

export const useEventsList = () => {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventsList().then(setEvents).catch(setError);
  }, []);

  return { events, error };
};
