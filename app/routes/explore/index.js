import React from 'react';
import Route from 'found/Route';
import {
  getDefault,
  getComponentOrLoadingRenderer
} from '../../util/routerUtils';
import Error404 from '../../component/404';

const explorePageComponents = {
  content: (
    <Route
      getComponent={() =>
        import(/* webpackChunkName: "explore" */ './page').then(getDefault)
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
};

export default config => (
  <Route path="/explore">
    <Route path="/">{explorePageComponents}</Route>
    <Route
      path={`${config.indexPath === '' ? '' : `/${config.indexPath}`}/:from/-`}
    >
      {explorePageComponents}
    </Route>
    <Route
      path={`${config.indexPath === '' ? '' : `/${config.indexPath}`}/-/:to`}
    >
      {explorePageComponents}
    </Route>
    <Route path="pois">
      <Route Component={Error404} />
      <Route path=":id">
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
                import(/* webpackChunkName: "pois" */ './details/pois/page').then(
                  getDefault
                )
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
      <Route Component={Error404} />
      <Route path=":id">
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
                import(/* webpackChunkName: "events" */ './details/events/page').then(
                  getDefault
                )
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
  </Route>
);
