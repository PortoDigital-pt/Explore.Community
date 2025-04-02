import React from 'react';
import { node } from 'prop-types';

const MapToolBar = ({ children }) => {
  return <div className="map-tool-bar-container">{children}</div>;
};

MapToolBar.propTypes = {
  children: node
};

export default MapToolBar;
