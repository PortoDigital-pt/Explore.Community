import React, { Suspense, useState, useCallback, lazy } from 'react';
import Icon from '../../../Icon';

const Menu = lazy(() => import('./menu'));

export default function SidebarMenu() {
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return (
    <>
      <button className="menu" onClick={open} type="button">
        <Icon img="icon-menu" viewBox="0 0 24 24" />
      </button>
      <Suspense fallback="">
        <Menu isOpen={isOpen} onClose={close} />
      </Suspense>
    </>
  );
}
