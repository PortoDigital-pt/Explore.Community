import React from 'react';
import { bool, func, string } from 'prop-types';
import Icon from '../../../Icon';

const AccordionItem = ({ category, onClick, showIcon, className }) => {
  return (
    <button
      type="button"
      className={`category-item ${className}`}
      aria-label="something" // TODO: aria label
      onClick={onClick}
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
};

AccordionItem.propTypes = {
  category: string.isRequired,
  onClick: func.isRequired,
  showIcon: bool.isRequired,
  className: string.isRequired
};

export default AccordionItem;
