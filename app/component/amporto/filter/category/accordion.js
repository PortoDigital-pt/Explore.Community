import React, { useRef, useState, useCallback } from 'react';
import classnames from 'classnames';
import { node, string } from 'prop-types';
import Icon from '../../../Icon';

const Accordion = ({ title, iconId, ariaLabel, children }) => {
  const [active, setActive] = useState(false);
  const [height, setHeight] = useState('0px');
  const content = useRef(null);

  const toggleAccordion = useCallback(() => {
    setActive(!active);
    setHeight(active ? '0px' : `${content.current.scrollHeight}px`);
  }, [active, setActive, setHeight]);

  return (
    <div className="accordion-container">
      <button
        type="button"
        aria-label={ariaLabel}
        className={classnames('accordion', { active })}
        onClick={toggleAccordion}
      >
        <div className="accordion-header">
          <Icon img={iconId} viewBox="0 0 50 50" className="icon-prefix" />
          <span className="accordion__title">{title}</span>
          <Icon
            img={`icon-chevron-${active ? 'up' : 'down'}`}
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
};

Accordion.propTypes = {
  title: string.isRequired,
  iconId: string.isRequired,
  children: node.isRequired,
  ariaLabel: string.isRequired
};

export default Accordion;
