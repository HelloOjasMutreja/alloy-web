import { useEffect, useState, type CSSProperties } from 'react';

export function useAnimationEntry(delay = 0): { style: CSSProperties } {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => {
      window.clearTimeout(timer);
    };
  }, [delay]);

  return {
    style: {
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'translateY(0)' : 'translateY(12px)',
      transition: `opacity 680ms cubic-bezier(0.25,0,0,1) ${delay}ms, transform 680ms cubic-bezier(0.25,0,0,1) ${delay}ms`,
    },
  };
}

