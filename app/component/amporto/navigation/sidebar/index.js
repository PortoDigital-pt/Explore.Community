import React, { Suspense, useState, useCallback, lazy } from 'react';
import getContext from 'recompose/getContext';
import { intlShape } from 'react-intl';
import { configShape } from '../../../../util/shapes';
import Icon from '../../../Icon';

const Menu = lazy(() => import('./menu'));

const SidebarMenu = (_, { intl }) => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button
        className="menu"
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

SidebarMenu.contextTypes = {
  intl: intlShape.isRequired
};

export default getContext({
  config: configShape.isRequired,
  intl: intlShape.isRequired
})(SidebarMenu);
