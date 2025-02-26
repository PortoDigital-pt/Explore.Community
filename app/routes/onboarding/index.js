import React from 'react';
import Route from 'found/Route';

export default () => (
  <Route
    path="/onboarding"
    getComponent={() => import('./page').then(module => module.default)}
  />
);
