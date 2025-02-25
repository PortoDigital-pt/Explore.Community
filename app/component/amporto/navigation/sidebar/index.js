import React, { Suspense, useState, useCallback, lazy } from 'react';
import { bool } from 'prop-types';
import classnames from 'classnames';
import getContext from 'recompose/getContext';
import { intlShape } from 'react-intl';
import { configShape } from '../../../../util/shapes';
import Icon from '../../../Icon';
import useModal from '../../../../hooks/useModal';

const Menu = lazy(() => import('./menu'));

const SidebarMenu = ({ shadow = false }, { intl }) => {
  const { isOpen, open, close } = useModal();

  return (
    <>
      <button
        className={classnames('menu', { shadow })}
        onClick={open}
        type="button"
        aria-label={intl.messages['nav-menu-open']}
      >
        <Icon img="icon-menu" viewBox="0 0 24 24" />
      </button>
      {isOpen && (
        <Suspense fallback="">
          <Menu isOpen={isOpen} onClose={close} />
        </Suspense>
      )}
    </>
  );
};

SidebarMenu.propTypes = {
  shadow: bool
};

SidebarMenu.contextTypes = {
  intl: intlShape.isRequired
};

export default getContext({
  config: configShape.isRequired,
  intl: intlShape.isRequired
})(SidebarMenu);
