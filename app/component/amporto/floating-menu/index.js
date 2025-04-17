import React from 'react';
import { bool, func, node } from 'prop-types';

const FloatingMenu = ({ isOpen, close, children }) =>
  isOpen && (
    <>
      <button
        className="floating-menu-overlay"
        onClick={close}
        type="button"
        aria-label="close"
      />
      <div className="floating-menu">{children}</div>
    </>
  );

FloatingMenu.propTypes = {
  isOpen: bool.isRequired,
  close: func.isRequired,
  children: node.isRequired
};

export default FloatingMenu;
