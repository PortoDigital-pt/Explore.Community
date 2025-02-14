import React from 'react';
import { string, bool, func } from 'prop-types';
import classnames from 'classnames';
import Icon from '../../../Icon';

// TODO: aria label to navigation

export const NavTab = ({ item, onClick, description, active }) => (
  <button
    type="button"
    className="nav-tab"
    aria-label={description}
    onClick={onClick}
  >
    <div className={classnames('content', { active })}>
      <Icon img={`icon-${item}`} viewBox="0 0 24 24" />
      <span>{description}</span>
    </div>
    <div
      className={classnames('nav-tab-active-indicator', {
        hide: !active
      })}
    />
  </button>
);

NavTab.propTypes = {
  item: string.isRequired,
  onClick: func.isRequired,
  description: string.isRequired,
  active: bool.isRequired
};
