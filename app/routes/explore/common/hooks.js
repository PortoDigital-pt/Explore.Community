import { useState, useEffect } from 'react';
import { isValidLocation } from '../../../util/amporto/geo';

export const useListData = ({
  language,
  location,
  coordinatesBounds,
  getData,
  args
}) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getData({
      language,
      coords: isValidLocation(location, coordinatesBounds)
        ? `${location.lat},${location.lon}`
        : null,
      ...args
    })
      .then(setData)
      .catch(setError);
  }, [
    location.hasLocation,
    location.lat,
    location.lon,
    ...Object.values(args),
    language
  ]);

  return { data, error };
};

export const useSelectedData = ({ id, language, getDataById }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDataById({ id, query: { language } })
      .then(setSelectedData)
      .catch(setError);
  }, [id, language]);

  return { selectedData, error };
};
