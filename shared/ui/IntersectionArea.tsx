import { ReactNode, useEffect, useRef } from "react";

interface Props {
  onImpression: Function;
  children: ReactNode;
}

export function IntersectionArea({ onImpression, children }: Props) {
  const targetRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          onImpression();
        }
      },
      { threshold: 0 },
    );
    const currentRef = targetRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }
    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onImpression, targetRef]);
  return <div ref={targetRef}>{children}</div>;
}
