import React from 'react';
import Route from 'found/Route';

function Content() {
  return <div>Profile content</div>;
}

export default () => (
  <Route path="/profile">
    <Route Component={Content} allowAsIndex />
  </Route>
);
