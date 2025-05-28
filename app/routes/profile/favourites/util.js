export const MY_PLACES = {
  home: 'home',
  work: 'work'
};

export const PLACE_ICONS = {
  [MY_PLACES.home]: 'icon-home-with-background',
  [MY_PLACES.work]: 'icon-work-with-background',
  stop: 'icon-icon_bus_with_background',
  station: 'icon-icon_subway_with_background',
  place: 'icon-pin-map-with-background',
  events: 'icon-explore-icon_events_with_background',
  bikeStation: 'icon-icon_citybike',
  taxiStation: 'icon-icon_taxis',
  pois: 'icon-explore-icon_pois_with_background',
  routes: 'icon-routes_with_background',
  unknown: 'icon-pin-map-with-background'
};

export const getPlaceIcon = placeType =>
  PLACE_ICONS[placeType] || PLACE_ICONS.unknown;

export const getPlaceIconByFavorite = favorite =>
  getPlaceIcon(favorite.myPlace || favorite.type);

export const FAVOURITE_REGULAR_ICONS = {
  [MY_PLACES.home]: 'icon-home-regular',
  [MY_PLACES.work]: 'icon-work-regular',
  stop: 'icon-bus-regular',
  station: 'icon-subway-regular',
  place: 'icon-pin-map-regular',
  events: 'icon-explore-icon_events_no_map',
  bikeStation: 'icon-icon_scooter_no_map',
  pois: 'icon-explore-icon_pois_no_map',
  routes: 'icon-routes',
  unknown: 'icon-pin-map-regular'
};

export const getFavouriteRegularIcon = key =>
  FAVOURITE_REGULAR_ICONS[key] || FAVOURITE_REGULAR_ICONS.unknown;

export const getRegularIconByFavorite = favorite =>
  getFavouriteRegularIcon(favorite.myPlace || favorite.type);

export const getFavouriteName = favorite =>
  favorite?.name || favorite?.defaultName || favorite?.address?.split(',')[0];

export const favoriteTypeResolver = favorite =>
  favorite.layer === 'pois' ? favorite.layer : favorite.type;
