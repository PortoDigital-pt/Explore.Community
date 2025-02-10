import React from 'react';
import { NavButton } from './button';

const NAVIGATION_PATHS = {
  EXPLORE: 'explore',
  NAVIGATE: 'navigate',
  ITENERARIES: 'iteneraries',
  BLOCKS: 'blocks',
  FAVOURITES: 'favourites',
};

// WIP
// will depend on config - iteneraries + blocks
// need to match route for active
// need to translate PT/EN


export const MobileNavigationBar = () => (
  <div className="navbar">
    <div>
      {Object.values(NAVIGATION_PATHS).map(path => (
        <NavButton key={path} path={path} description={path} />
      ))}
    </div>
  </div>
);