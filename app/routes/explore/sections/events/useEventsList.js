import { useState, useEffect } from 'react';
import { getEventList } from '../../../../util/amporto/api';

export const useEventsList = () => {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventList().then(setEvents).catch(setError);
  }, []);

  return { events, error };
};
