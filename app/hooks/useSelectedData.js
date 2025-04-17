import { useState, useEffect } from 'react';

const useSelectedData = ({ id, language, getDataById }) => {
  const [selectedData, setSelectedData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    const { signal } = controller;

    getDataById({ id, query: { language } }, { signal })
      .then(setSelectedData)
      .catch(error => !signal.aborted && setError(error));

    return () => controller.abort();
  }, [id, language]);

  return { selectedData, error };
};

export default useSelectedData;
