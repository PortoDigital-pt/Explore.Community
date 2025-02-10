import React from 'react';
import classnames from 'classnames';
import Icon from '../../Icon';

export const NavButton = ({ active, path, description }) => (
    <div className='nav-button'>
        <div className='content'>
            <div className='nav-icon'>
                <Icon img={`icon-${path}`} viewBox='0 0 24 24' />
            </div>
            <span className='text-center'>{description}</span>
        </div>
        <div className={classnames('nav-button-active-indicator', {
            'hide': !active,
        })} />
    </div>
);