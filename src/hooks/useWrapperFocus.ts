import { useEffect, useRef } from "react";
import useWindow from "./useWindow";

interface WrapperOptions {
  onFocus?: () => void;
  onBlur?: () => void;
  defaultFocus?: boolean;
}

export const useWrapperFocus = ({
  onFocus,
  onBlur,
  defaultFocus = false,
}: WrapperOptions) => {
  const window = useWindow();

  /** Useful when working with autoFocus */
  const wrapper = useRef<HTMLDivElement>(null);
  const prevFocused = useRef<boolean>(defaultFocus);
  const functionRefs = useRef({
    onFocus,
    onBlur,
  });

  useEffect(() => {
    functionRefs.current.onBlur = onBlur;
    functionRefs.current.onFocus = onFocus;
  }, [onBlur, onFocus]);

  useEffect(() => {
    const onFocusChange = (event: any) => {
      if (!wrapper.current || !event.target) {
        return;
      }

      if (event.target === window || event.target === document) {
        return;
      }

      const currFocused = wrapper.current.contains(event.target) ?? false;
      if (currFocused && !prevFocused.current) {
        functionRefs.current.onFocus?.();
      } else if (!currFocused && prevFocused.current) {
        functionRefs.current.onBlur?.();
      }
      prevFocused.current = currFocused;
    };

    // need the third argument as we want the bubbled event
    window.addEventListener("focus", onFocusChange, true);
    window.document.addEventListener("mousedown", onFocusChange);
    window.document.addEventListener("touchstart", onFocusChange);

    return () => {
      window.removeEventListener("focus", onFocusChange);
      window.document.removeEventListener("mousedown", onFocusChange);
      window.document.removeEventListener("touchstart", onFocusChange);
    };
  }, [window]);

  return wrapper;
};
