import React from 'react';
import { NavBar } from './navbar';

const NAV_ITEMS = {
  EXPLORE: 'Expl',
  NAVIGATE: 'Navi',
  BLOCKS: 'Block',
  ITENERARIES: 'Iten',
  FAVOURITES: 'Favo',
};

const NavButton = ({ name, active }) => (
  <div
    style={{
      position: 'relative',
      display: 'flex',
      color: 'white',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
    }}
  >
    <span style={{ margin: 'auto' }}>{name}</span>
    <div
      style={{
        display: active ? 'block' : 'none',
        position: 'absolute',
        bottom: 0,
        width: '28px',
        height: '2px',
        background: 'white',
        borderRadius: '2px 2px 0px 0px',
      }}
    />
  </div>
);

export const TestNav = () => (
  <NavBar>
    {Object.values(NAV_ITEMS).map(name => (
      <NavButton key={name} name={name} active />
    ))}
  </NavBar>
);
