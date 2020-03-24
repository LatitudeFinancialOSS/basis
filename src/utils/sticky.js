import React from "react";
import { setPath } from "./objectPath";
import { DEFAULT_BREAKPOINT } from "./css";

export function getStickyItemInfo(children, theme) {
  const childrenArray = React.Children.toArray(children);

  if (childrenArray.length === 0) {
    throw new Error("Sticky.Item cannot be empty.");
  }

  if (childrenArray.length > 1) {
    throw new Error("Sticky.Item must have a single child.");
  }

  const component = childrenArray[0].type;
  const id = component.ID;

  if (!id || typeof id !== "string") {
    throw new Error(
      'Sticky.Item\'s child must expose a unique ID, e.g.: MyChild.ID = "MyChild";'
    );
  }

  const componentHeightMap = component.HEIGHT_MAP;

  if (!componentHeightMap || typeof componentHeightMap !== "object") {
    throw new Error("Sticky.Item's child must expose a HEIGHT_MAP object.");
  }

  if (typeof componentHeightMap[DEFAULT_BREAKPOINT] === "undefined") {
    throw new Error(
      `Sticky.Item's child exposes a HEIGHT_MAP object, but the object is missing a \`${DEFAULT_BREAKPOINT}\` property.`
    );
  }

  let height = componentHeightMap[DEFAULT_BREAKPOINT];

  if (typeof height !== "number" || height <= 0) {
    throw new Error(
      `Sticky.Item's child exposes a HEIGHT_MAP object, but object's \`${DEFAULT_BREAKPOINT}\` value is not a positive integer.`
    );
  }

  const heightMap = {
    [DEFAULT_BREAKPOINT]: height,
  };
  let lastHeight = height;

  for (const bp in theme.breakpoints) {
    height = componentHeightMap[bp];

    if (typeof height === "undefined") {
      heightMap[bp] = lastHeight;
    } else if (typeof height === "number" && height > 0) {
      heightMap[bp] = height;
      lastHeight = height;
    } else {
      throw new Error(
        `Sticky.Item's child exposes a HEIGHT_MAP object, but object's \`${bp}\` value is not a positive integer.`
      );
    }
  }

  return {
    id,
    heightMap,
  };
}

export function getStickyItemCSS({ heightMap, offsetMap, theme }) {
  let result = {
    /*
      We want to ensure that Sticky.Items are painted above normal content.
      Is normal content has `position: relative` (like Grid does), it would be 
      painted on top of the Sticky.Item if the Sticky.Item doesn't have z-index > 0.
      That's why we define a z-index on Sticky.Items.
      See: https://stackoverflow.com/q/60825826/247243
    */
    zIndex: theme.zIndices.stickyItem,
    position: "sticky",
  };
  let lastHeight = null;
  let lastOffset = null;

  for (const bp in heightMap) {
    if (heightMap[bp] !== lastHeight) {
      lastHeight = heightMap[bp];

      const height = `${lastHeight}px`;

      result = setPath(
        result,
        bp === DEFAULT_BREAKPOINT
          ? "height"
          : `${theme.minMediaQueries[bp]}.height`,
        height
      );
    }

    if (offsetMap[bp] !== lastOffset) {
      lastOffset = offsetMap[bp];

      const top = `${lastOffset}px`;

      result = setPath(
        result,
        bp === DEFAULT_BREAKPOINT ? "top" : `${theme.minMediaQueries[bp]}.top`,
        top
      );
    }
  }

  return result;
}
