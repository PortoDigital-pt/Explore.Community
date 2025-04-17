import { useEffect, useRef } from 'react';

const useOnScreen = ({ onScreen }) => {
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && onScreen()
    );
    ref.current && observer.observe(ref.current);

    return () => observer.disconnect();
  }, [ref.current]);

  return ref;
};

export default useOnScreen;
