import React from 'react';
import { string, bool, func } from 'prop-types';
import classnames from 'classnames';
import Icon from '../../../Icon';

export const NavTab = ({ item, onClick, description, active }) => (
  <div
    className="nav-tab"
    aria-label={description}
    onClick={onClick}
    role="button"
    tabIndex={0}
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
  </div>
);

NavTab.propTypes = {
  item: string.isRequired,
  onClick: func.isRequired,
  description: string.isRequired,
  active: bool.isRequired
};
