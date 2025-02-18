import React from 'react';
import { bool, func } from 'prop-types';
import Modal from 'react-modal';
import Content from './content';

const classNames = {
  base: 'sidebar-content',
  afterOpen: 'sidebar-content-open',
  beforeClose: 'sidebar-content-close'
};
const overlayClassNames = {
  base: 'sidebar-overlay',
  afterOpen: 'sidebar-overlay-open',
  beforeClose: 'sidebar-overlay-close'
};

Modal.setAppElement('#app');

const Menu = ({ isOpen, onClose }) => (
  <Modal
    isOpen={isOpen}
    closeTimeoutMS={450}
    className={classNames}
    overlayClassName={overlayClassNames}
    onRequestClose={onClose}
    shouldFocusAfterRender
    shouldCloseOnEsc
  >
    <Content onClose={onClose} />
  </Modal>
);

Menu.propTypes = {
  isOpen: bool.isRequired,
  onClose: func.isRequired
};

export default Menu;
