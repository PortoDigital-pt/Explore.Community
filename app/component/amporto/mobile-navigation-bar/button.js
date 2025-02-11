import React from 'react';
import { string, bool } from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon';

export const NavButton = ({ active, path, description }) => (
  <button type="button" className="nav-button" aria-label={description}>
    <div className="content">
      <Icon img={`icon-${path}`} viewBox="0 0 24 24" />
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
  active: bool.isRequired,
  path: string.isRequired,
  description: string.isRequired
};
