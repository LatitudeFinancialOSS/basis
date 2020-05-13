import { useState, useEffect, useCallback } from "react";

function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(null);
  const setInitialValue = useCallback(() => {
    const value = localStorage?.getItem(key);

    // value is undefined when localStorage doesn't exist, and null when the key doesn't exist.
    if (value == null) {
      return setValue(initialValue);
    }

    try {
      setValue(JSON.parse(value));
    } catch {
      console.error(`useLocalStorage: Couldn't parse: [${value}]`);

      setValue(initialValue);
    }
  }, [key, initialValue]);

  // We set the initial value here to make sure that server and client render the same thing.
  useEffect(() => {
    setInitialValue();
  }, [setInitialValue]);

  useEffect(() => {
    try {
      localStorage && localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(
        `useLocalStorage: Saving in localStorage failed: ${error.message}`
      );
    }
  }, [key, value]);

  return [value, setValue];
}

export default useLocalStorage;
