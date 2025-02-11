/* eslint-disable react/jsx-key */
import React from 'react';
import Route from 'found/Route';

function Test() {
  return <span>Itineraries/test</span>;
}

function Content() {
  return <div>Itineraries content</div>;
}

function ItinerariesMapContent() {
  return <div>Itineraries/map content</div>;
}

function ItinerariesMapMap() {
  return <div>Itineraries/map map</div>;
}

export default () => (
  <Route path="/itineraries">
    <Route Component={Content} allowAsIndex />
    <Route path="test" Component={Test} />
    <Route path="map">
      {{
        content: <Route getComponent={() => ItinerariesMapContent} />,
        map: <Route getComponent={() => ItinerariesMapMap} />
      }}
    </Route>
  </Route>
);
