import React from 'react';
import Route from 'found/Route';

function Test() {
  return <span>Explore/test</span>;
}

function Content() {
  return <div>Explore content</div>;
}

function ExploreMapContent() {
  return <div>Explore/map content</div>;
}

function ExploreMapMap() {
  return <div>Explore/map map</div>;
}

export default () => (
  <Route path="/explore">
    <Route Component={Content} allowAsIndex />
    <Route path="test" Component={Test} />
    <Route path="map">
      {{
        content: <Route getComponent={() => ExploreMapContent} />,
        map: <Route getComponent={() => ExploreMapMap} />
      }}
    </Route>
  </Route>
);
