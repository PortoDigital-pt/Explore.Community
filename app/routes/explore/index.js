import React from 'react';
import Route from 'found/Route';
import { graphql } from 'react-relay';
import {
  getDefault,
  getComponentOrLoadingRenderer
} from '../../util/routerUtils';
import {
  PREFIX_BIKESTATIONS,
  PREFIX_TAXISTATIONS,
  PREFIX_SCOOTERSTATIONS,
  PREFIX_TERMINALS,
  PREFIX_STOPS
} from '../../util/path';

export default config => {
  const { routes, districts } = config.optionalNavigationItems;

  return (
    <Route path="/">
      <Route path="pois">
        <Route path="/">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois-list" */ './list/pois/page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois-list-map" */ './list/pois/pageMap'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
          }}
        </Route>
        <Route path=":id">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois" */ './details/pois/page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "pois-map" */ './details/pois/pageMap'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
          }}
        </Route>
      </Route>
      <Route path="events">
        <Route path="/">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events-list" */ './list/events/page'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events-list-map" */ './list/events/pageMap'
                  ).then(getDefault)
                }
                render={getComponentOrLoadingRenderer}
              />
            )
          }}
        </Route>
        <Route path=":id">
          {{
            content: (
              <Route
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events" */ './details/events/page'
                  ).then(getDefault)
                }
              />
            ),
            map: (
              <Route
                disableMapOnMobile={false}
                getComponent={() =>
                  import(
                    /* webpackChunkName: "events-map" */ './details/events/pageMap'
                  ).then(getDefault)
                }
              />
            )
          }}
        </Route>
      </Route>
      <Route path={`${PREFIX_BIKESTATIONS}/:id`}>
        {{
          header: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "generic-heading" */ '../../component/GenericHeader'
                ).then(getDefault)
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-bikes" */ '../../component/VehicleRentalStationContent'
                ).then(getDefault)
              }
              query={graphql`
                query explore_routes_VehicleRentalStation_Query($id: String!) {
                  vehicleRentalStation(id: $id) {
                    ...VehicleRentalStationContent_vehicleRentalStation
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          ),
          map: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-bikes" */ '../../component/VehicleRentalStationMapContainer'
                ).then(getDefault)
              }
              query={graphql`
                query explore_routes_VehicleRentalStationMap_Query(
                  $id: String!
                ) {
                  vehicleRentalStation(id: $id) {
                    ...VehicleRentalStationMapContainer_vehicleRentalStation
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          )
        }}
      </Route>
      <Route path={`${PREFIX_SCOOTERSTATIONS}/:id`}>
        {{
          header: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "generic-heading" */ '../../component/GenericHeader'
                ).then(getDefault)
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-scooters" */ '../../component/ScooterRentalStationContent'
                ).then(getDefault)
              }
              query={graphql`
                query explore_routes_ScooterRentalStation_Query($id: String!) {
                  vehicleRentalStation(id: $id) {
                    ...ScooterRentalStationContent_vehicleRentalStation
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          ),
          map: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-scooters" */ '../../component/ScooterRentalStationMapContainer'
                ).then(getDefault)
              }
              query={graphql`
                query explore_routes_ScooterRentalStationMap_Query(
                  $id: String!
                ) {
                  vehicleRentalStation(id: $id) {
                    ...ScooterRentalStationMapContainer_vehicleRentalStation
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          )
        }}
      </Route>
      <Route path={`${PREFIX_TAXISTATIONS}/:id`}>
        {{
          header: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "generic-heading" */ '../../component/GenericHeader'
                ).then(getDefault)
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-taxis" */ '../../component/TaxiRentalStationContent'
                ).then(getDefault)
              }
              query={graphql`
                query explore_routes_TaxiRentalStation_Query($id: String!) {
                  vehicleRentalStation(id: $id) {
                    ...TaxiRentalStationContent_vehicleRentalStation
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          ),
          map: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-taxis" */ '../../component/TaxiRentalStationMapContainer'
                ).then(getDefault)
              }
              query={graphql`
                query explore_routes_TaxiRentalStationMap_Query($id: String!) {
                  vehicleRentalStation(id: $id) {
                    ...TaxiRentalStationMapContainer_vehicleRentalStation
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          )
        }}
      </Route>
      <Route path={`${PREFIX_TERMINALS}/:id`}>
        {{
          header: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "generic-heading" */ '../../component/GenericHeader'
                ).then(getDefault)
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-terminals" */ '../../component/SimpleStationContent'
                ).then(getDefault)
              }
              query={graphql`
                query explore_SimpleStationContent_Query($id: String!) {
                  station(id: $id) {
                    ...SimpleStationContent_station
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          ),
          map: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-terminals" */ '../../component/stop/TerminalPageMapContainer'
                ).then(getDefault)
              }
              query={graphql`
                query explore_TerminalPageMapContainer_Query($id: String!) {
                  station(id: $id) {
                    ...TerminalPageMapContainer_station
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          )
        }}
      </Route>
      <Route path={`${PREFIX_STOPS}/:id`}>
        {{
          header: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "generic-heading" */ '../../component/GenericHeader'
                ).then(getDefault)
              }
            />
          ),
          content: (
            <Route
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-stops" */ '../../component/SimpleStopContent'
                ).then(getDefault)
              }
              query={graphql`
                query explore_SimpleStopContent_Query($id: String!) {
                  stop(id: $id) {
                    ...SimpleStopContent_stop
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          ),
          map: (
            <Route
              path="(.*)?"
              getComponent={() =>
                import(
                  /* webpackChunkName: "explore-stops" */ '../../component/stop/StopPageMapContainer'
                ).then(getDefault)
              }
              query={graphql`
                query explore_StopPageMapContainer_Query($id: String!) {
                  stop(id: $id) {
                    ...StopPageMapContainer_stop
                  }
                }
              `}
              render={({ Component, props, error, retry }) => {
                if (Component && (props || error)) {
                  return <Component {...props} isExplore error={error} />;
                }
                return getComponentOrLoadingRenderer({
                  Component,
                  props,
                  error,
                  retry
                });
              }}
            />
          )
        }}
      </Route>
      {routes && (
        <Route path="routes">
          <Route path="/">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes-list" */ './list/routes/page'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes-list-map" */ './list/routes/pageMap'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              )
            }}
          </Route>
          <Route path=":id">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes" */ './details/routes/pois/detail-page'
                    ).then(getDefault)
                  }
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "routes-map" */ './details/routes/pageMap'
                    ).then(getDefault)
                  }
                />
              )
            }}
          </Route>
        </Route>
      )}
      {districts && (
        <Route path="districts">
          <Route path="/">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "districts-list" */ './list/districts/page'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "districts-list-map" */ './list/districts/pageMap'
                    ).then(getDefault)
                  }
                  render={getComponentOrLoadingRenderer}
                />
              )
            }}
          </Route>
          <Route path=":id">
            {{
              content: (
                <Route
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "districts" */ './details/districts/page'
                    ).then(getDefault)
                  }
                />
              ),
              map: (
                <Route
                  disableMapOnMobile={false}
                  getComponent={() =>
                    import(
                      /* webpackChunkName: "districts-map" */ './details/districts/pageMap'
                    ).then(getDefault)
                  }
                />
              )
            }}
          </Route>
        </Route>
      )}
      <Route path="/">
        {{
          content: (
            <Route
              getComponent={() =>
                import(/* webpackChunkName: "explore" */ './page').then(
                  getDefault
                )
              }
            />
          ),
          map: (
            <Route
              disableMapOnMobile={false}
              getComponent={() =>
                import(/* webpackChunkName: "explore-map" */ './pageMap').then(
                  getDefault
                )
              }
            />
          )
        }}
      </Route>
    </Route>
  );
};
