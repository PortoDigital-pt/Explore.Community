/* eslint-disable prefer-template */

function routeSelector(routePageProps) {
  const route = routePageProps.route.gtfsId.split(':');
  return route[1];
}

function vehicleNumberParser(vehicleNumber) {
  return vehicleNumber;
}

function subwayMqttTopicResolver(
  route,
  direction,
  tripStartTime,
  headsign,
  feedId,
  tripId,
  geoHash
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
    '+' + // remove trip start time
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

function busMqttTopicResolver(
  route,
  direction,
  tripStartTime,
  headsign,
  feedId,
  tripId,
  geoHash
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

const feedResolver = {
  mqtt: process.env.MQTT_WEBSOCKET_URL,
  credentials: { username: 'username', password: 'password' },
  gtfsrt: true,
  routeSelector,
  active: true,
  vehicleNumberParser
};

export default {
  1: { ...feedResolver, mqttTopicResolver: subwayMqttTopicResolver },
  2: { ...feedResolver, mqttTopicResolver: busMqttTopicResolver }
};
