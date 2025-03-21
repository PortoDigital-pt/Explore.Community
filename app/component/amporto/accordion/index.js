import React, { useRef, useState } from 'react';
import { node, string } from 'prop-types';
import Icon from '../../Icon';

function Accordion({ title, iconId, children }) {
  const [active, setActive] = useState(false);
  const content = useRef(null);
  const [height, setHeight] = useState('0px');

  function toggleAccordion() {
    setActive(!active);
    setHeight(active ? '0px' : `${content.current.scrollHeight}px`);
  }

  return (
    <div className="accordion-container">
      <button
        type="button"
        className={`accordion ${active ? 'active' : ''}`}
        onClick={toggleAccordion}
      >
        <div className="accordion-header">
          {iconId && (
            <Icon img={iconId} viewBox="0 0 32 32" className="icon-prefix" />
          )}

          <span className="accordion__title">{title}</span>

          <Icon
            img={active ? 'icon-chevron-up' : 'icon-chevron-down'}
            viewBox="0 0 24 24"
            className="icon-suffix"
          />
        </div>
      </button>

      <div
        ref={content}
        style={{ maxHeight: `${height}` }}
        className="accordion__content"
      >
        {children}
      </div>
    </div>
  );
}

Accordion.propTypes = {
  title: string.isRequired,
  iconId: string.isRequired,
  children: node.isRequired
};

export default Accordion;
