import React, { useEffect, useState } from 'react';
import { bool, func, string } from 'prop-types';
import Icon from '../../../Icon';

function AccordionItem({
  isSelected,
  type,
  category,
  onClick,
  showIcon,
  className,
  key
}) {
  const [selected, setSelected] = useState(isSelected);

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  return (
    <button
      type="button"
      className={`category-item ${className}`}
      key={key}
      onClick={() => {
        setSelected(!selected);
        onClick({ type, category, selected: !selected });
      }}
    >
      <span className="name">{category}</span>

      {showIcon && (
        <Icon
          img="icon-check-with-circle"
          viewBox="0 0 20 20"
          className="check-icon"
        />
      )}
    </button>
  );
}

AccordionItem.propTypes = {
  isSelected: bool,
  category: string.isRequired,
  onClick: func,
  key: string,
  type: string,
  showIcon: bool,
  className: string
};

AccordionItem.defaultProps = {
  isSelected: false,
  onClick: () => {},
  showIcon: false,
  className: ''
};

export default AccordionItem;
