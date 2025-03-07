import React from 'react';
import Route from 'found/Route';
import { getDefault } from '../../util/routerUtils';

function TestEvents() {
  return <span>Explore/events/id</span>;
}
function TestPois() {
  return <span>Explore/pois/id</span>;
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
    <Route path="events">
      <Route path=":id">
        {{
          content: <Route getComponent={() => TestEvents} />
        }}
      </Route>
    </Route>
    <Route path="pois">
      <Route path=":id">
        {{
          content: <Route getComponent={() => TestPois} />
        }}
      </Route>
    </Route>
  </Route>
);
