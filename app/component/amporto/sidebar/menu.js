import React from 'react';
import { bool, func } from 'prop-types';
import Modal from 'react-modal';

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

const Menu = ({ isOpen, onClose }) => (
    <Modal
        isOpen={isOpen}
        closeTimeoutMS={450}
        className={classNames}
        overlayClassName={overlayClassNames}
        onRequestClose={onClose}
        shouldFocusAfterRender={false}
    >
        <div>MODAL</div>
    </Modal>
);

Menu.propTypes = {
    isOpen: bool.isRequired,
    onClose: func.isRequired
};

export default Menu;