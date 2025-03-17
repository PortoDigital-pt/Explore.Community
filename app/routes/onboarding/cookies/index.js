import React from 'react';
import { bool } from 'prop-types';
import Content from './content';
import useModal from '../../../hooks/useModal';
import Modal from '../../../component/amporto/modal';

const classNames = {
  base: 'modal-content',
  afterOpen: 'modal-content-open',
  beforeClose: 'modal-content-close'
};

const Cookies = ({ startOpen, ...props }) => {
  const { isOpen, close } = useModal({ startOpen });

  return (
    <Modal isOpen={isOpen} className={classNames} overlayClassName="overlay">
      <Content onClose={close} {...props} />
    </Modal>
  );
};

Cookies.propTypes = {
  startOpen: bool.isRequired
};

export default Cookies;
