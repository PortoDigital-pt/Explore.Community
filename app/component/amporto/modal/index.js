import React from 'react';
import { bool, node, string, shape, oneOfType, func } from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const CustomModal = ({
  isOpen,
  className,
  overlayClassName,
  onRequestClose,
  shouldFocusAfterRender = false,
  shouldCloseOnEsc = false,
  children
}) => (
  <Modal
    isOpen={isOpen}
    closeTimeoutMS={450}
    className={className}
    overlayClassName={overlayClassName}
    onRequestClose={onRequestClose}
    shouldFocusAfterRender={shouldFocusAfterRender}
    shouldCloseOnEsc={shouldCloseOnEsc}
  >
    {children}
  </Modal>
);

CustomModal.propTypes = {
  isOpen: bool.isRequired,
  className: oneOfType([string, shape()]).isRequired,
  overlayClassName: oneOfType([string, shape()]).isRequired,
  onRequestClose: func,
  shouldFocusAfterRender: bool,
  shouldCloseOnEsc: bool,
  children: node.isRequired
};

export default CustomModal;
