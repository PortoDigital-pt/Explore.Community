export const COMMON_NAVIGATION_ITEMS = {
  EXPLORE: 'explore',
  NAVIGATE: 'navigate',
  ITINERARIES: 'itineraries',
  BLOCKS: 'blocks'
};

export const COMMON_NAVIGATION_ITEMS_PATH_MAP = {
  [COMMON_NAVIGATION_ITEMS.EXPLORE]: `/${COMMON_NAVIGATION_ITEMS.EXPLORE}`,
  [COMMON_NAVIGATION_ITEMS.NAVIGATE]: '/',
  [COMMON_NAVIGATION_ITEMS.ITINERARIES]: `/${COMMON_NAVIGATION_ITEMS.ITINERARIES}`,
  [COMMON_NAVIGATION_ITEMS.BLOCKS]: `/${COMMON_NAVIGATION_ITEMS.BLOCKS}`
};

export const filterOptionalNavigationItems = (optionalNavigationItems, items) =>
  Object.entries(items).reduce(
    (acc, [key, value]) =>
      optionalNavigationItems[value] === undefined ||
      optionalNavigationItems[value]
        ? { ...acc, [key]: value }
        : acc,
    {}
  );
