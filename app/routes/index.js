/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'found/Route';
import queryMiddleware from 'farce/queryMiddleware';
import createRender from 'found/createRender';
import Error404 from '../component/404';
import TopLevel from '../component/TopLevel';
import getExploreRoutes from './explore';
import getNavigateRoutes from './navigate';
import getFavouritesRoutes from './favourites';
import getItinerariesRoutes from './itineraries';
import getBlocksRoutes from './blocks';
import getProfileRoutes from './profile';
import getAboutRoutes from './about';

export const historyMiddlewares = [queryMiddleware];

export const render = createRender({});

export default config => {
  const { itineraries, blocks } = config.optionalNavigationItems;

  return (
  <Route Component={TopLevel}>
    <Route path="/js/*" Component={Error404} />
    <Route path="/css/*" Component={Error404} />
    <Route path="/assets/*" Component={Error404} />
    {getAboutRoutes()}
    {getProfileRoutes()}
    {getExploreRoutes()}
    {getFavouritesRoutes()}
    {itineraries && getItinerariesRoutes()}
    {blocks && getBlocksRoutes()}
    {getNavigateRoutes(config) /* Digitransit routes */}
    {/* For all the rest render 404 */}
    <Route path="*" Component={Error404} />
  </Route>
);
};
