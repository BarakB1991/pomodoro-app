import { useEffect } from 'react';

const useWindowResize = (ref, callback) => {
  useEffect(() => {
    if (!ref.current) return;

    const handleResize = () => {
      callback(ref.current.offsetWidth < 333);
    };

    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [ref, callback]);
};

export default useWindowResize;
