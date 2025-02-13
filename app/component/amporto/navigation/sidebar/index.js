import React, { Suspense, useState, useCallback, lazy } from 'react';
import Icon from '../../../Icon';
import withBreakpoint from '../../../../util/withBreakpoint';

const Menu = lazy(() => import('./menu'));

const SidebarMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button className="menu" onClick={open} type='button'>
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

export default withBreakpoint(SidebarMenu);
