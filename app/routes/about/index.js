import React from 'react';
import Route from 'found/Route';

export default () => (
  <Route
    path="/about"
    getComponent={() => import('./page').then(module => module.default)}
  />
);
