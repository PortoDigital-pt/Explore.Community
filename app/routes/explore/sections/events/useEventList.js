import { useState, useEffect } from 'react';
import { getEventList } from '../../../../util/amporto/api';
import { isValidLocation } from '../../../../util/amporto/geo';

export const useEventList = ({
  language,
  location,
  coordinatesBounds,
  selectedCategories
}) => {
  const [events, setEvents] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getEventList({
      coords: isValidLocation(location, coordinatesBounds)
        ? `${location.lat},${location.lon}`
        : null,
      categories: selectedCategories
    })
      .then(eventsDto =>
        setEvents(eventsDto.map(dto => ({ ...dto, type: 'events' })))
      )
      .catch(setError);
  }, [
    location.hasLocation,
    location.lat,
    location.lon,
    selectedCategories,
    language
  ]);

  return { data: events, error };
};
