import React from 'react';
import classnames from 'classnames';
import Icon from '../../Icon';

export const NavButton = ({ active, path, description }) => (
  <button className="nav-button">
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
