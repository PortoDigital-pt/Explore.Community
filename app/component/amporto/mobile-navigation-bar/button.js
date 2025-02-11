import React from 'react';
import { string, bool, func } from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon';

// WIP
// define mixins for fonts/bolds/colors to use on active

export const NavButton = ({ item, onClick, description, active }) => (
  <button
    type="button"
    className="nav-button"
    aria-label={description}
    onClick={onClick}
  >
    <div className="content">
      <Icon img={`icon-${item}`} viewBox="0 0 24 24" />
      <span className="text-center">{description}</span>
    </div>
    <div
      className={classnames('nav-button-active-indicator', {
        hide: !active
      })}
    />
  </button>
);

NavButton.propTypes = {
  item: string.isRequired,
  onClick: func.isRequired,
  description: string.isRequired,
  active: bool.isRequired
};
