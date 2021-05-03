import React from "react";

// don't want to install an npm package for this just adding the code into here.
// https://github.com/gregberge/react-merge-refs/blob/3dc2804807097562e9952cfa6057a8a3bef9f39f/src/index.tsx
export default function mergeRefs<T = any>(
  refs: Array<React.MutableRefObject<T> | React.LegacyRef<T>>
): React.RefCallback<T> {
  return (value) => {
    refs.forEach((ref) => {
      if (typeof ref === "function") {
        ref(value);
      } else if (ref != null) {
        (ref as React.MutableRefObject<T | null>).current = value;
      }
    });
  };
}
