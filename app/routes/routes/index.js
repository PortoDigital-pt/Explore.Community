import React from 'react';
import Route from 'found/Route';

function Test() {
  return <span>Routes/test</span>;
}

function Content() {
  return <div>Routes content</div>;
}

function RoutesMapContent() {
  return <div>Routes/map content</div>;
}

function RoutesMapMap() {
  return <div>Routes/map map</div>;
}

export default () => (
  <Route path="/routes">
    <Route Component={Content} allowAsIndex />
    <Route path="test" Component={Test} />
    <Route path="map">
      {{
        content: <Route getComponent={() => RoutesMapContent} />,
        map: <Route getComponent={() => RoutesMapMap} />
      }}
    </Route>
  </Route>
);
