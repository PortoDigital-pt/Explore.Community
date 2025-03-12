import React from 'react';
import { bool, node } from 'prop-types';
import Modal from 'react-modal';

const classNames = {
  base: 'details-page modal',
  afterOpen: 'details-content-open',
  beforeClose: 'details-content-close'
};

Modal.setAppElement('#app');

const DetailsModal = ({ isOpen, children }) => (
  <Modal
    isOpen={isOpen}
    closeTimeoutMS={450}
    className={'details-page modal'}
    overlayClassName={'overlay'}
    shouldFocusAfterRender
    shouldCloseOnEsc
  >
    {children}
  </Modal>
);

DetailsModal.propTypes = {
  isOpen: bool.isRequired,
  children: node.isRequired
};

export default DetailsModal;
