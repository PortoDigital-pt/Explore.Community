import React from 'react';
import Route from 'found/Route';
import { getDefault } from '../../util/routerUtils';

function Test() {
  return <span>Explore/test</span>;
}

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
          /* webpackChunkName: "itinerary" */ '../../component/map/ExplorePageMap'
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
    <Route path="test" Component={Test} />
  </Route>
);
