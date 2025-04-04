import React from 'react';
import { func } from 'prop-types';
import Icon from '../../Icon';

const SeeOnMapButton = ({ onClick }) => (
  <button className="see-on-map" type="button" aria-label="" onClick={onClick}>
    <Icon img="icon-see-on-map" viewBox="0 0 50 50" />
  </button>
);

SeeOnMapButton.propTypes = {
  onClick: func.isRequired
};

export default SeeOnMapButton;
