import React from 'react';
import { func } from 'prop-types';
import Icon from '../../../Icon';

// TODO: name from config?

const Content = ({ onClose }) => (
    <>
        <>
            <div className='top'>
                <h1>Explore.Porto</h1>
                <button onClick={onClose} >
                    <Icon img="icon-close" viewBox="0 0 33 33" />
                </button>
            </div>
            <div>Languages</div>
            <nav>nav items</nav>

        </>
        <footer>footer</footer>
    </>
);

Content.propTypes = {
    onClose: func.isRequired
}

export default Content;