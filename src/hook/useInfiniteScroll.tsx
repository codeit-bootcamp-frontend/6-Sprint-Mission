import React, { useRef, useState, useEffect } from 'react';

const useInfiniteScroll = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [limit, setLimit] = useState(6);
  let preventFirst = 0;

  const callback = (entry: IntersectionObserverEntry[]) => {
    if (entry[0].isIntersecting && preventFirst > 0) {
      setLimit((prev) => prev + 6);
    }
    preventFirst++;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(callback, { threshold: 1 });
    if (scrollRef.current !== null) {
      observer.observe(scrollRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, []);
  return { scrollRef, limit };
};

export default useInfiniteScroll;

