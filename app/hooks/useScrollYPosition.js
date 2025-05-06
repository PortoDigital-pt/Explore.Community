import { useLayoutEffect, useState, useMemo, useCallback, useRef } from 'react';
import debounce from 'lodash/debounce';

const useScrollYPosition = breakpoint => {
  const [scrollY, setScrollY] = useState(0);
  const firstYPosition = useRef(scrollY);
  const elementRef = useRef(null);

  const elementClassname = useMemo(
    () => (breakpoint === 'large' ? 'scroll-target' : 'drawer-container'),
    [breakpoint]
  );

  const scrollToTop = useCallback(() => {
    elementRef.current?.scrollTo({
      top: firstYPosition.current,
      left: 0,
      behavior: 'smooth'
    });
  }, []);

  const handleScroll = useMemo(
    () =>
      debounce(event => {
        const y = event?.target?.scrollTop ?? 0;
        setScrollY(y);

        // Store firstYPosition only once for non-large
        if (breakpoint !== 'large' && firstYPosition.current === 0 && y !== 0) {
          firstYPosition.current = y;
        }
      }, 100),
    [breakpoint]
  );

  useLayoutEffect(() => {
    const element = document.querySelector(`.${elementClassname}`);
    elementRef.current = element;
    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element?.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [elementClassname, handleScroll]);

  return { scrollY, scrollToTop };
};

export default useScrollYPosition;
