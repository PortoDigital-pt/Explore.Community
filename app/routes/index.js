/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'found/Route';
import queryMiddleware from 'farce/queryMiddleware';
import createRender from 'found/createRender';
import Error404 from '../component/404';
import TopLevel from '../component/TopLevel';
import { getDefault } from '../util/routerUtils';
import getExploreRoutes from './explore';
import getNavigateRoutes from './navigate';
import getFavouritesRoutes from './favourites';
import getItinerariesRoutes from './itineraries';
import getBlocksRoutes from './blocks';

export const historyMiddlewares = [queryMiddleware];

export const render = createRender({});

export default config => (
  <Route Component={TopLevel}>
    <Route
      path="/about"
      getComponent={() =>
        import(/* webpackChunkName: "about" */ '../component/AboutPage').then(
          getDefault
        )
      }
    />
    <Route path="/js/*" Component={Error404} />
    <Route path="/css/*" Component={Error404} />
    <Route path="/assets/*" Component={Error404} />
    {getExploreRoutes()}
    {getFavouritesRoutes()}
    {config.showItineraries && getItinerariesRoutes()}
    {config.showBlocks && getBlocksRoutes()}
    {getNavigateRoutes(config) /* Digitransit routes */}
    {/* For all the rest render 404 */}
    <Route path="*" Component={Error404} />
  </Route>
);
