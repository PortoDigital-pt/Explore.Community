/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'found/Route';

function Test() {
  return <span>Favourites/test</span>;
}

function Content() {
  return <div>Favourites content</div>;
}

function FavouritesMapContent() {
  return <div>Favourites/map content</div>;
}

function FavouritesMapMap() {
  return <div>Favourites/map map</div>;
}

export default () => (
  <Route path="/favourites">
    <Route Component={Content} allowAsIndex />
    <Route path="test" Component={Test} />
    <Route path="map">
      {{
        content: <Route getComponent={() => FavouritesMapContent} />,
        map: <Route getComponent={() => FavouritesMapMap} />
      }}
    </Route>
  </Route>
);
