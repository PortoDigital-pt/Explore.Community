import React from 'react';
import { string, bool, func } from 'prop-types';
import classnames from 'classnames';
import Icon from '../../../Icon';

export const NavTab = ({ item, onClick, aria, description, active }) => (
  <button type="button" className="nav-tab" aria-label={aria} onClick={onClick}>
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
  aria: string.isRequired,
  description: string.isRequired,
  active: bool.isRequired
};
