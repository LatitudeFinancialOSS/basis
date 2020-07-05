import { useState, useEffect } from "react";
import useWindow from "../../hooks/useWindow";

function FocusVisiblePolyfill() {
  const [isKeyboardMode, setIsKeyboardMode] = useState(false);
  const onKeyDown = () => setIsKeyboardMode(true);
  const onMouseDown = () => setIsKeyboardMode(false);
  const window = useWindow();

  useEffect(() => {
    if (window) {
      window.addEventListener("keydown", onKeyDown);
      window.addEventListener("mousedown", onMouseDown);
    }

    return () => {
      if (window) {
        window.removeEventListener("keydown", onKeyDown);
        window.removeEventListener("mousedown", onMouseDown);
      }
    };
  }, [window]);

  useEffect(() => {
    if (window) {
      window.document.body.dataset.basisKeyboardMode = String(isKeyboardMode);
    }
  }, [window, isKeyboardMode]);

  return null;
}

export default FocusVisiblePolyfill;
