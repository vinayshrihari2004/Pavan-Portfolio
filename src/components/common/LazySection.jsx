import React, { useState, useEffect, useRef } from "react";

export default function LazySection({ children, minHeight = "400px" }) {
  const [shouldRender, setShouldRender] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShouldRender(true);
          observer.disconnect();
        }
      },
      { rootMargin: "300px" } // Starts loading 300px before reaching the viewport
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} style={{ minHeight: shouldRender ? "auto" : minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}