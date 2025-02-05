/* eslint-disable prefer-template */

function defaultRouteSelector(routePageProps) {
  const route = routePageProps.route.gtfsId.split(':');
  return route[1];
}
function defaulVehicleNumberParser(vehicleNumber) {
  return vehicleNumber;
}
function walttiTopicResolver(
  route,
  direction,
  tripStartTime,
  headsign,
  feedId,
  tripId,
  geoHash,
) {
  return (
    '/gtfsrt/vp/' +
    feedId +
    '/+/+/+/' +
    route +
    '/' +
    direction +
    '/' +
    headsign +
    '/' +
    tripId +
    '/+/' +
    tripStartTime +
    '/+/' +
    geoHash[0] +
    '/' +
    geoHash[1] +
    '/' +
    geoHash[2] +
    '/' +
    geoHash[3] +
    '/#'
  );
}

export default {
  2: {
    mqttTopicResolver: walttiTopicResolver,
    mqtt: 'wss://mmt.portodigital.pt/websocket/',
    credentials: { username: 'username', password: 'password' },
    gtfsrt: true,
    routeSelector: defaultRouteSelector,
    active: true,
    vehicleNumberParser: defaulVehicleNumberParser,
  },
  1: {
    mqttTopicResolver: walttiTopicResolver,
    mqtt: 'wss://mmt.portodigital.pt/websocket/',
    credentials: { username: 'username', password: 'password' },
    gtfsrt: true,
    routeSelector: defaultRouteSelector,
    active: true,
    vehicleNumberParser: defaulVehicleNumberParser,
  },
};
