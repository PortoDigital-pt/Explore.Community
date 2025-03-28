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
