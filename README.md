## Explore.Community
Explore.Community is an open-source digital platform based on the [Digitransit platform](https://digitransit.fi/en/). 

The Explore.Community is designed to integrate and visualize the urban assets of a territory in a coherent and user-friendly way. It consolidates data and information related to mobility, public services, cultural resources, and community facilities within a single digital environment.

For more information, check our [wiki](https://github.com/PortoDigital-pt/Explore.Community/wiki/Welcome-to-the-Explore.Community!). To follow updates from the community, visit our [website].

## Dependencies

* OpenTripPlaner instance
* Pelias geocoder instance
* Compatible Mapbox vector tiles server instance
* NGSIv2 Context Broker instance
* Source for base map
* Digitransit MQTT broker instance for realtime vehicle position
* OpenIDConnect Authentication platform (only needed if you will use authentication; example: keycloak)
* MongoDB instance version 6.0.20 Community (only needed if you will use authentication)
* Redis instance version 7.4.2 (only needed if you will use authentication)

## Implementing in your Community, steps:
* Check the [documentation](#docs) files
* Clone the github project
* Follow the [installation](docs/Installation.md) guide
* Review the [themes](docs/Themes.md) guide, to understand the configuration files and options
* Customize it according to your needs and preferences.

## Demos
- [Explore Porto](https://explore.porto.pt/)


## <a name="docs"></a>Documentation

- [Terms](docs/Terms.md)
- [Architecture](docs/Architecture.md)
- [Positioning](docs/Position.md)
- [Locations](docs/Location.md)
- [Run in Docker](docs/Docker.md)
- [Installation](docs/Installation.md)
- [Tests](docs/Tests.md)
- [Z-Index Index](docs/ZIndex.md)
- [Benchmark results and UX](docs/JSBenchmark.md)
- [Navigation](docs/Navigation.md)
- [Themes](docs/Themes.md)
- [GeoJSON](docs/GeoJson.md)
