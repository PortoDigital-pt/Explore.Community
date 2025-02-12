import React from 'react';
import { string, bool, func } from 'prop-types';
import classnames from 'classnames';
import Icon from '../../Icon';

// WIP
// define mixins for fonts/bolds/colors to use on active

export const NavTab = ({ item, onClick, description, active }) => (
  <div
    className="nav-tab"
    aria-label={description}
    onClick={onClick}
    role="button"
    tabIndex={0}
  >
    <div className="content">
      <Icon
        img={`icon-${item}`}
        viewBox="0 0 24 24"
        className={active ? 'active' : ''}
      />
      <span
        className={classnames('text-center', {
          active
        })}
      >
        {description}
      </span>
    </div>
    <div
      className={classnames('nav-tab-active-indicator', {
        hide: !active
      })}
    />
  </div>
);

NavTab.propTypes = {
  item: string.isRequired,
  onClick: func.isRequired,
  description: string.isRequired,
  active: bool.isRequired
};
