export const getOffset = ({ limit, page }) =>
  Number.parseInt(limit, 10) * (Number.parseInt(page, 10) - 1);

const getTotalPages = ({ total, limit }) =>
  Math.ceil(Number.parseInt(total, 10) / Number.parseInt(limit, 10));

export const getInfinitePagination = ({ total, limit, page }) => ({
  total,
  nextPage: Number.parseInt(page, 10) + 1,
  hasNext: Number.parseInt(page, 10) < getTotalPages({ total, limit })
});
