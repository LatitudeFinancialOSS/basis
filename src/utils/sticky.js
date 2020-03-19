import React from "react";
import { setPath } from "./objectPath";
import { DEFAULT_BREAKPOINT } from "./css";

export function getStickyItemHeightMap(item, theme) {
  const childrenArray = React.Children.toArray(item.props.children);

  if (childrenArray.length === 0) {
    throw new Error("Sticky.Item cannot be empty.");
  }

  if (childrenArray.length > 1) {
    throw new Error("Sticky.Item must have a single child.");
  }

  const heightMap = childrenArray[0].type.HEIGHT_MAP;

  if (!heightMap || typeof heightMap !== "object") {
    throw new Error("Sticky.Item's child must expose a HEIGHT_MAP object.");
  }

  if (typeof heightMap[DEFAULT_BREAKPOINT] === "undefined") {
    throw new Error(
      `Sticky.Item's child exposes a HEIGHT_MAP object, but the object is missing a \`${DEFAULT_BREAKPOINT}\` property.`
    );
  }

  let height = heightMap[DEFAULT_BREAKPOINT];

  if (typeof height !== "number" || height <= 0) {
    throw new Error(
      `Sticky.Item's child exposes a HEIGHT_MAP object, but object's \`${DEFAULT_BREAKPOINT}\` value is not a positive integer.`
    );
  }

  const result = {
    [DEFAULT_BREAKPOINT]: height
  };
  let lastHeight = height;

  for (const bp in theme.breakpoints) {
    height = heightMap[bp];

    if (typeof height === "undefined") {
      result[bp] = lastHeight;
    } else if (typeof height === "number" && height > 0) {
      result[bp] = height;
      lastHeight = height;
    } else {
      throw new Error(
        `Sticky.Item's child exposes a HEIGHT_MAP object, but object's \`${bp}\` value is not a positive integer.`
      );
    }
  }

  return result;
}

function getStickyItemCSS({ heightMap, offsetMap, theme }) {
  let result = {
    position: "sticky"
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

export function getStickyItemsCSS(heightMaps, theme) {
  if (heightMaps.length === 0) {
    return [];
  }

  const result = [];
  const offsetMap = {};

  for (const bp in heightMaps[0]) {
    offsetMap[bp] = 0;
  }

  for (let i = 0; i < heightMaps.length; i++) {
    const heightMap = heightMaps[i];

    result.push(
      getStickyItemCSS({
        heightMap,
        offsetMap,
        theme
      })
    );

    for (const bp in heightMap) {
      offsetMap[bp] += heightMap[bp];
    }
  }

  return result;
}
