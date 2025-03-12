import React from 'react';
import { bool, node } from 'prop-types';
import Modal from 'react-modal';

Modal.setAppElement('#app');

const DetailsModal = ({ isOpen, children }) => (
  <Modal
    isOpen={isOpen}
    closeTimeoutMS={450}
    className="details-page modal"
    overlayClassName="overlay"
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
