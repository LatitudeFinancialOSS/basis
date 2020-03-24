import { useState, useEffect } from "react";
import copyToClipboard from "copy-to-clipboard";

const COPIED_DURATION = 3000;

function useCopyToClipboard(getTextToCopy) {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    if (isCopied) {
      const timeoutId = setTimeout(() => {
        setIsCopied(false);
      }, COPIED_DURATION);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [isCopied]);

  return [
    isCopied,
    () => {
      const didCopy = copyToClipboard(getTextToCopy());

      setIsCopied(didCopy);
    },
  ];
}

export default useCopyToClipboard;
