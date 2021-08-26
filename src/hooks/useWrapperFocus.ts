import { useEffect, useRef } from "react";

interface WrapperOptions {
  onFocus?: () => void;
  onBlur?: () => void;
  defaultFocus?: boolean;
}

const getIframeDocument = (elem: HTMLDivElement | null) => {
  const targetIframe = Array.from(
    document.querySelectorAll("iframe")
  ).find((val) => val.contentDocument?.contains(elem));
  return targetIframe && (targetIframe!.contentDocument as Document);
};

const getIframeWindow = (elem: HTMLDivElement | null) => {
  const targetIframe = Array.from(
    document.querySelectorAll("iframe")
  ).find((val) => val.contentDocument?.contains(elem));
  return targetIframe && targetIframe!.contentWindow!.window;
};

const attachEventListeners = (
  node: HTMLDivElement | null,
  onFocusChange: (event: any) => void
) => {
  const iframeWindow = getIframeWindow(node);
  const iframeDocument = getIframeDocument(node);
  if (iframeWindow && iframeDocument) {
    iframeWindow.addEventListener("focus", onFocusChange, true);
    iframeDocument.addEventListener("mousedown", onFocusChange);
    iframeDocument.addEventListener("touchstart", onFocusChange);
  }
  window.addEventListener("focus", onFocusChange, true);
  document.addEventListener("mousedown", onFocusChange);
  document.addEventListener("touchstart", onFocusChange);
};

const detachEventListeners = (
  node: HTMLDivElement | null,
  onFocusChange: (event: any) => void
) => {
  const iframeWindow = getIframeWindow(node);
  const iframeDocument = getIframeDocument(node);
  if (iframeWindow && iframeDocument) {
    iframeWindow.removeEventListener("focus", onFocusChange, true);
    iframeDocument.removeEventListener("mousedown", onFocusChange);
    iframeDocument.removeEventListener("touchstart", onFocusChange);
  }
  window.removeEventListener("focus", onFocusChange, true);
  document.removeEventListener("mousedown", onFocusChange);
  document.removeEventListener("touchstart", onFocusChange);
};

export const useWrapperFocus = ({
  onFocus,
  onBlur,
  defaultFocus = false,
}: WrapperOptions) => {
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

      if (
        event.target instanceof Window ||
        event.target instanceof HTMLDocument
      ) {
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
    const node = wrapper.current;

    attachEventListeners(node, onFocusChange);

    return () => {
      detachEventListeners(node, onFocusChange);
    };
  }, []);

  return wrapper;
};
