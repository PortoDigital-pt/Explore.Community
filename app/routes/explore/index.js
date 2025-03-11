import React from 'react';
import Route from 'found/Route';
import { getDefault } from '../../util/routerUtils';

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
        import(
          /* webpackChunkName: "explore-map" */ '../../component/map/ExplorePageMap'
        ).then(getDefault)
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
              getComponent={() => import(/* webpackChunkName: "pois" */ './pois/page').then(getDefault)}
            />
          ),
          map: (
            <Route
              disableMapOnMobile={false}
              getComponent={() => import(/* webpackChunkName: "pois-map" */ '../../component/map/PoisPageMap').then(getDefault)}
            />
          )
        }}
      </Route>
    </Route>
    <Route path="events">
      <Route path=":id">
        {{
          content: (
            <Route
              getComponent={() => import(/* webpackChunkName: "events" */ './events/page').then(getDefault)}
            />
          )
        }}
      </Route>
    </Route>
  </Route>
);
