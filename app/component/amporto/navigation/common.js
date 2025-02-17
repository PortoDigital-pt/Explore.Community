/**
 * Define common navigation items in the application
 */
export const COMMON_NAVIGATION_ITEMS = {
  EXPLORE: 'explore',
  NAVIGATE: 'navigate',
  ITINERARIES: 'itineraries',
  BLOCKS: 'blocks'
};

/**
 * Maps the common navigation items in the application to its corresponding route
 */
export const COMMON_NAVIGATION_ITEMS_PATH_MAP = {
  [COMMON_NAVIGATION_ITEMS.EXPLORE]: `/${COMMON_NAVIGATION_ITEMS.EXPLORE}`,
  [COMMON_NAVIGATION_ITEMS.NAVIGATE]: '/',
  [COMMON_NAVIGATION_ITEMS.ITINERARIES]: `/${COMMON_NAVIGATION_ITEMS.ITINERARIES}`,
  [COMMON_NAVIGATION_ITEMS.BLOCKS]: `/${COMMON_NAVIGATION_ITEMS.BLOCKS}`
};

/**
 * Generate a new Navigation item configuration for the items to be shown
 *
 * @param {object} optionalNavigationItems configuration of the optional Navigation items to hide/show
 * @param {object} items the Navigation items
 *
 * @returns {object} the new Navigation items
 */
export const generateNavigationItemsConfig = (optionalNavigationItems, items) =>
  Object.entries(items).reduce(
    (acc, [key, value]) =>
      optionalNavigationItems[value] === undefined ||
      optionalNavigationItems[value]
        ? { ...acc, [key]: value }
        : acc,
    {}
  );
