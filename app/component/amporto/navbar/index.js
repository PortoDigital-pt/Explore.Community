import React from 'react';
import { arrayOf, node } from 'prop-types';

export const NavBar = ({ children }) => (
  <div className="navbar">
    <div>{children}</div>
  </div>
);

NavBar.propTypes = {
  children: arrayOf(node).isRequired,
};
