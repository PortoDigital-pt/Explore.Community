import React from 'react';
import PropTypes from 'prop-types';
import Icon from './Icon';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
function ToggleMapTracking({ handleClick, ariaLabel, img, className }) {
  return (
    <div
      className="toggle-positioning-container"
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label={ariaLabel}
    >
      <Icon img={img} className={className} />
    </div>
  );
}

ToggleMapTracking.propTypes = {
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired
};

export default ToggleMapTracking;
