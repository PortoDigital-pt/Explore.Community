import { useState, useCallback } from 'react';

const useModal = ({ startOpen = false } = {}) => {
  const [isOpen, setIsOpen] = useState(startOpen);

  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);

  return { isOpen, open, close };
};

export default useModal;
