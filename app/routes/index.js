/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'found/Route';
import queryMiddleware from 'farce/queryMiddleware';
import createRender from 'found/createRender';
import Error404 from '../component/404';
import TopLevel from '../component/TopLevel';
import { getDefault } from '../util/routerUtils';
import getNavigateRoutes from './navigate';
import getExploreRoutes from './explore';

export const historyMiddlewares = [queryMiddleware];

export const render = createRender({});

export default config => (
  <Route Component={TopLevel}>
    <Route
      path="/tietoja-palvelusta"
      getComponent={() =>
        import(/* webpackChunkName: "about" */ '../component/AboutPage').then(
          getDefault,
        )
      }
    />
    <Route path="/js/*" Component={Error404} />
    <Route path="/css/*" Component={Error404} />
    <Route path="/assets/*" Component={Error404} />
    {getExploreRoutes()}
    {getNavigateRoutes(config)}
    {/* For all the rest render 404 */}
    <Route path="*" Component={Error404} />
  </Route>
);
