/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'found/Route';
import queryMiddleware from 'farce/queryMiddleware';
import createRender from 'found/createRender';
import Error404 from '../component/404';
import TopLevel from '../component/TopLevel';
import getExploreRoutes from './explore';
import getBrowseRoutes from './browse';
import getFavouritesRoutes from './favourites';
import getRoutesRoutes from './routes';
import getBlocksRoutes from './blocks';
import getProfileRoutes from './profile';
import getAboutRoutes from './about';
import Main from './top-level';

export const historyMiddlewares = [queryMiddleware];

export const render = createRender({});

export default config => {
  const { routes, blocks } = config.optionalNavigationItems;

  return (
    <>
    {getAboutRoutes()}
    <Route path='/' Component={Main}>
      <Route Component={TopLevel} allowAsIndex>
        <Route path="/js/*" Component={Error404} />
        <Route path="/css/*" Component={Error404} />
        <Route path="/assets/*" Component={Error404} />
        {getProfileRoutes()}
        {getExploreRoutes()}
        {getFavouritesRoutes()}
        {routes && getRoutesRoutes()}
        {blocks && getBlocksRoutes()}
        {getBrowseRoutes(config) /* Digitransit routes */}
        {/* For all the rest render 404 */}
        <Route path="*" Component={Error404} />
      </Route>
    </Route>
    </>
  );
};
