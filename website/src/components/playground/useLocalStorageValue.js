import { useState, useEffect } from "react";

function useLocalStorageValue(localStorageKey, fallbackValue) {
  const [value, setValue] = useState(null);

  useEffect(() => {
    const value = localStorage?.getItem(localStorageKey);

    // value is undefined when localStorage doesn't exist, and null when the key doesn't exist.
    if (value == null) {
      setValue(fallbackValue);
    } else {
      try {
        setValue(JSON.parse(value));
      } catch {
        console.error(`useLocalStorageValue: Couldn't parse: ${value}`);

        setValue(fallbackValue);
      }
    }
  }, [localStorageKey, fallbackValue]);

  return value;
}

export default useLocalStorageValue;
