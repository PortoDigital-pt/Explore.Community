import React, { useState } from 'react';
import classnames from 'classnames';
import { string, bool, node } from 'prop-types';
import Icon from '../../Icon';

const FilterButton = ({ label, selected, icon }) => {
  const [isSelected, setSelected] = useState(selected);

  return (
    <button
      type="button"
      className={classnames('filter-container--content', {
        selected: isSelected ? 'selected' : ''
      })}
      onClick={() => setSelected(!isSelected)}
    >
      {icon}

      <span className="content-title">{label}</span>

      {isSelected && (
        <Icon img="icon-x-circle" viewBox="0 0 16 16" className="icon-suffix" />
      )}
    </button>
  );
};

FilterButton.propTypes = {
  label: string.isRequired,
  selected: bool.isRequired,
  icon: node.isRequired
};

export default FilterButton;
