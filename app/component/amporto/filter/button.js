import React, { useEffect, useState } from 'react';
import classnames from 'classnames';
import { string, bool, node, func } from 'prop-types';
import Icon from '../../Icon';

const FilterButton = ({
  label,
  selected,
  icon,
  handleClick,
  alwaysUnselected
}) => {
  const [isSelected, setIsSelected] = useState(selected);

  useEffect(() => {
    setIsSelected(selected);
  }, [selected]);

  return (
    <button
      type="button"
      aria-label={'open filter' /* TODO: add translation */}
      className={classnames('filter-container--content', {
        selected: isSelected ? 'selected' : ''
      })}
      onClick={() => {
        setIsSelected(alwaysUnselected ? false : !isSelected);
        handleClick();
      }}
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
  icon: node.isRequired,
  handleClick: func,
  alwaysUnselected: bool
};

FilterButton.defaultProps = {
  handleClick: () => {}
};

export default FilterButton;
