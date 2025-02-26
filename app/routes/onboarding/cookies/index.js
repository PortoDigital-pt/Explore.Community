import React from 'react';
import { bool } from 'prop-types';
import Modal from 'react-modal';
import Content from './content';
import useModal from '../../../hooks/useModal';

const classNames = {
  base: 'modal-content',
  afterOpen: 'modal-content-open',
  beforeClose: 'modal-content-close'
};

Modal.setAppElement('#app');

const Cookies = ({ startOpen, ...props }) => {
  const { isOpen, close } = useModal({ startOpen });

  return (
    <Modal
      isOpen={isOpen}
      closeTimeoutMS={450}
      className={classNames}
      overlayClassName="overlay"
    >
      <Content onClose={close} {...props} />
    </Modal>
  );
};

Cookies.propTypes = {
  startOpen: bool.isRequired
};

export default Cookies;
