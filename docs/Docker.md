## Explore.Community on Docker
You can run Explore.Community in docker. This is probably the easiest way to see the application running.

## Dependencies
- OpenTripPlaner instance
- Pelias geocoder instance
- Compatible Mapbox vector tiles server instance
- NGSIv2 Context Broker instance
- Source for base map
- Digitransit MQTT broker instance for realtime vehicle position
- OpenIDConnect Authentication platform (only needed if you will use authentication; example: keycloak)
- MongoDB instance version 6.0.20 Community (only needed if you will use authentication)
- Redis instance version 7.4.2 (only needed if you will use authentication)

### OpenTripPlaner
This software was developed and tested with OpenTripPlaner Docker image hsldevcom/opentripplanner:v2-prod-2024-12-16T15.34.13-684025c
available at [DockerHub](https://hub.docker.com).

### Source for base map
You will need to provide a source for map background images (tile layers) by configuring source (MAP_URL) and attribution (MAP_ATTRIBUTION) environment variables. You can find some free tile providers at https://leaflet-extras.github.io/leaflet-providers/preview/.

### MongoDB favorites database
In order to have user favorites saved server-side, you need to have OpenIDConnect authentication enabled, and 
you need to create a data base in your mongodb instance with a collection named `favorites`.

To authenticate server side componentes in your mongodb instance, you need to create
a mongodb database user for them. If you create a database named favoritesdb, you can create
server side componentes user in mongodb shell:
```
use favoritesdb
db.createUser(
  {
    user: "your_user",
    pwd:  "your_user_password",
    roles: [ { role: "readWrite", db: "favoritesdb" }]
  }
)
```

### Remove keycloak account configuration
In order to remove keycloak account in "Delete account" feature, you need to configure
a dedicated client on keycloak.

Create a new client with "Client authentication" enabled, "Authorization" enabled and
only "Direct access grants" Authentication flow. Then add "manage-users" role to it
service account roles.

## Environment variables
Before build container image, you need to create a `.env` file in the root folder of this project with your environment variables.
We will need this file to build container image, and to run container too.

|variable|description|
|-|-|
|NODE_ENV|Node environment|
|DEBUGLOGGING|Wether so log authentication related actions|
|CONFIG|your configuration name as for file config.«your configuration name».js|
|ROOTLINK|Your home URL|
|PORT|NodeJS listening TCP port|
|HOT_LOAD_PORT|Webpack port|
|PRIVACY_POLICY|URL for your privacy policy page|
|COOKIES_POLICY|URL for your cookies policy page|
|CULTURAL_AGENDA|URL of your cultural agenda website|
|API_URL|Root URL for your OpenTripPlanner instance|
|OTP_URL|GraphQL root URL for your OpenTripPlanner instance|
|EXPLORE_TILES_URL|URL for your travel data vector tiles layers|
|NGSI_URL|URL for your Orion Context Broker entities|
|GEOCODING_BASE_URL|URL for v1 pelias geocoder api|
|MAP_URL|URL for your base map|
|MAP_ATTRIBUTION|Leaflet compatible map attribution for your base map|
|BOUNDING_BOX|Comma separated pair of WGS84 coordinates for your region bounding box|
|APP_TITLE|Your application title|
|APP_DESCRIPTION|Your application description|
|TIME_ZONE|Timezone for your region|
|TIME_ZONE_DATA|Moment.js packed format for your timezone (see https://github.com/moment/moment-timezone/blob/develop/data/packed/latest.json)|
|FEED_IDS|Comma separated list of GTFS feeds configured in your OpenTripPlanner instance|
|SEARCH_SOURCES|Comma separated list of sources in your pelias instance|
|MINIMAL_REGEXP|Regular expression for minimal matching of your stops and routes|
|AVAILABLE_LANGUAGES|Comma separated list of languages|
|DEFAULT_LANGUAGE|Your default language|
|USE_REALTIME_TRAVELLER_CAPACITIES|If you have realtime occupancy status data in your OpenTripPlanner instance, set to true, else false|
|SHOW_NEAR_YOU_BUTTONS|If you want to show "Near you" buttons set to true, else false|
|NEAR_YOU_MODES|Comma separated list of OpenTripPlanner transport modes you want available at "Near you" section"|
|SHOW_DISTRICTS|true if you want to show PointOfInterestGroup data|
|SHOW_ROUTES|true if you want to show TouristTrip data|
|SHOW_FAVOURITES| true if you want favorites in your navbar|
|SHOW_WIFI| true if you want to show Wifi AP available from your vector tiles data|
|WEATHER_API|Your IPMA API URL (https://api.ipma.pt/open-data/forecast/meteorology)|
|WEATHER_CITY_CODE|City code for your IPMA API URL|
|WEATHER_CITY_URL|Orion Context Broker weather entity URL|
|MQTT_WEBSOCKET_URL|URL for your Digitransit MQTT broker instance|
|ALLOW_LOGIN|true if you will use authentication|
|SHOW_PROFILE_NOTIFICATION|true if you will use notifications|
|OIDC_ISSUER|URL for your OpenIDConnect realm (only needed if you will use authentication)|
|OIDC_CLIENT_ID|OpenIDConnect client ID (only needed if you will use authentication)|
|OIDC_CLIENT_SECRET|OpenIDConnect client secret (only needed if you will use authentication)|
|REDIS_HOST|hostname or IP of your Redis instance (only needed if you will use authentication)|
|REDIS_PORT|IP port for your Redis instance (only needed if you will use authentication)|
|MONGO_URI|URI of your MongoDB instante (only needed if you will use authentication)|
|EVENTS_PELIAS_SOURCE|pelias search source for your events data|
|POIS_PELIAS_SOURCE|pelias search source for your points of interest data|
|ROUTES_PELIAS_SOURCE|pelias search source for your routes data|
|DISTRICTS_PELIAS_SOURCE|pelias search source for your districts data|
|AUTH_PROVIDER_URL|Home URL of your keycloak instance|
|AUTH_PROVIDER_REALM|Your OpenIDConnect realm ID|
|AUTH_PROVIDER_CLIENT_ID|your "Delete account" dedicated client ID|
|AUTH_PROVIDER_CLIENT_SECRET|your "Delete account" dedicated client secret|
|MATOMO_URL|URL for your Matomo analytics|
|MATOMO_SITE_ID|Matomo site id to collect analytics|
|ONBOARDED_CREATED_AT|ISOString date used to reset onboarding cookies in client side to force user to go through the onboarding again|
|KIOSK_UA_REGEX|Regex expression used to check if current request is being sent by a Kiosk device|

## Configuration files
Create your configuration file named config.«your configuration name».js in folder `app/configurations` (see configuration example config.amporto.js).

## Build docker image
``` bash
docker build --build-arg CONFIG=«your configuration name» -t «your image name» . 
```

## Run your instance
``` bash
docker run --rm -p 8089:8089 --env-file .env «your image name»
```

## Access running application

- open `http://localhost:8089`
