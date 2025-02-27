import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from './Icon';
import useSmartNavigation from './amporto/navigation/useSmartNavigation'
import withBreakpoint from '../util/withBreakpoint';

/* eslint-disable jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions */
function ToggleMapTracking({ breakpoint, handleClick, ariaLabel, img, className }) {
  const canShow = useSmartNavigation();

  return (
    <div
      className={classnames('toggle-positioning-container', {
        'move-down': !canShow && breakpoint !== 'large'
      })}
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
  breakpoint: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  ariaLabel: PropTypes.string.isRequired
};

export default withBreakpoint(ToggleMapTracking);
