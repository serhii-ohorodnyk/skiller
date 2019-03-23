import { RefObject, useCallback, useEffect, useState } from "react";

const useRect = (ref: RefObject<HTMLElement>) => {
  const [componentSize, setComponentSize] = useState(
    ref.current ? ref.current.getBoundingClientRect() : undefined
  );

  const handleResize = useCallback(() => {
    if (ref.current) {
      setComponentSize(ref.current.getBoundingClientRect());
    }
  }, [ref]);

  useEffect(() => {
    if (!ref.current) {
      return;
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref.current]);

  return componentSize;
};

export default useRect;
