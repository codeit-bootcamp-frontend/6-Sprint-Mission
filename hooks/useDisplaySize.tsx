import { useState, useEffect } from 'react';

export type TDisplaySize = 'desktop' | 'tablet' | 'mobile' | undefined;

function useDisplaySize(): TDisplaySize {
  const [displaySize, setDisplaySize] = useState<TDisplaySize>();

  useEffect(() => {
    const getDisplaySize = () => {
      const width = window.innerWidth;
      if (width < 768) {
        return 'mobile';
      } else if (width < 1200) {
        return 'tablet';
      } else {
        return 'desktop';
      }
    };

    setDisplaySize(getDisplaySize());

    let debounceTimer: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      setDisplaySize(getDisplaySize());
    };

    const debounceHandleResize = () => {
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(handleResize, 100); // 100ms의 디바운스 타임
    };

    window.addEventListener('resize', debounceHandleResize);

    return () => {
      window.removeEventListener('resize', debounceHandleResize);
      clearTimeout(debounceTimer);
    };
  }, []);

  return displaySize;
}

export default useDisplaySize;
