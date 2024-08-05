import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

interface InfiniteScrollProps {
  onIntersect: () => void;
  enabled: boolean;
  children: ReactNode;
}

export function InfiniteScroll(props: InfiniteScrollProps) {
  const triggerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && props.enabled) {
          props.onIntersect();
        }
      },
      { threshold: 1 },
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => {
      if (triggerRef.current) {
        observer.unobserve(triggerRef.current);
      }
    };
  }, [props.onIntersect, props.enabled]);

  return (
    <div className="w-full">
      {props.children}
      <div ref={triggerRef} style={{ height: 1 }} />
    </div>
  );
}
