import React from 'react';
import Route from 'found/Route';

function Test() {
  return <span>Blocks/test</span>;
}

function Content() {
  return <div>Blocks content</div>;
}

function BlocksMapContent() {
  return <div>Blocks/map content</div>;
}

function BlocksMapMap() {
  return <div>Bloks/map map</div>;
}

export default () => (
  <Route path="/blocks">
    <Route Component={Content} allowAsIndex />
    <Route path="test" Component={Test} />
    <Route path="map">
      {{
        content: <Route getComponent={() => BlocksMapContent} />,
        map: <Route getComponent={() => BlocksMapMap} />
      }}
    </Route>
  </Route>
);
