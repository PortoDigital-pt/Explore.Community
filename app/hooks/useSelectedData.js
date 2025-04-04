import { useState, useEffect } from 'react';

const useSelectedData = ({ id, language, getDataById }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getDataById({ id, query: { language } })
      .then(setSelectedData)
      .catch(setError);
  }, [id, language]);

  return { selectedData, error };
};

export default useSelectedData;
