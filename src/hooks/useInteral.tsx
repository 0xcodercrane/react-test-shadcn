import { useEffect, useRef, useState } from 'react';

export function useInterval(callback: () => void, delay: number | null, tickAtStart: boolean) {
  const savedCallback = useRef<(() => void) | undefined>();
  const [hasTickedAtStart, setHasTickedAtStart] = useState(false);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    function tick() {
      if (typeof savedCallback.current === 'function') {
        savedCallback.current();
      }
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      if (tickAtStart && !hasTickedAtStart) {
        setHasTickedAtStart(true);
        tick();
      }
      return () => clearInterval(id);
    }
  }, [delay, hasTickedAtStart, tickAtStart]);
}