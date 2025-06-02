export const buildQueryString = data => {
  const query = new URLSearchParams();

  Object.entries(data).forEach(([key, value]) => {
    if (value === undefined || value === null) {
      return;
    }
    query.set(key, value.toString());
  });

  const value = query.toString();
  return value ? `?${value}` : '';
};

export const buildDataForRoutes = data => {
  const auxData = { ...data };

  const categories = auxData.categories.filter(it => !it.startsWith('others-'));

  const difficulties = auxData.categories.filter(it =>
    it.startsWith('others-difficulty-')
  );

  const durationRanges = auxData.categories.filter(it =>
    it.startsWith('others-durationRange-')
  );

  delete auxData.categories;

  return buildQueryString({
    ...auxData,
    categories,
    difficulties,
    durationRanges
  });
};
