import React, { useState } from 'react';
import { bool, func, string } from 'prop-types';
import Icon from '../../../Icon';

function AccordionItem({ isSelected, type, category, onClick, key }) {
  const [selected, setSelected] = useState(isSelected);

  return (
    <button
      type="button"
      className="category-item"
      key={key}
      onClick={() => {
        setSelected(!selected);
        onClick(type, category, !selected);
      }}
    >
      <span className="name">{category}</span>

      {selected && <Icon img="icon-icon_check_new" viewBox="0 0 24 24" />}
    </button>
  );
}

AccordionItem.propTypes = {
  isSelected: bool,
  category: string.isRequired,
  onClick: func,
  key: string,
  type: string
};

AccordionItem.defaultProps = {
  isSelected: false,
  onClick: () => {}
};

export default AccordionItem;
