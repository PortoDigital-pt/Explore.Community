import { useEffect, useState } from 'react';
import debounce from 'lodash/debounce';

const useScrollYPosition = elementClassname => {
  const [scrollY, setScrollY] = useState(0);
 
  useEffect(() => {
    const handleScroll = debounce((event) => {
      setScrollY(event?.target?.scrollTop ?? 0);
    }, 200);
    const element = document.getElementsByClassName(elementClassname)[0];

    element.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      element.removeEventListener('scroll', handleScroll);
      handleScroll.cancel();
    };
  }, [elementClassname]);

  return scrollY;
}

export default useScrollYPosition;