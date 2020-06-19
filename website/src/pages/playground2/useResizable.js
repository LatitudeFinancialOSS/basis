import React, { useState, useEffect, useMemo } from "react";
import { Resizable as ReResizable } from "re-resizable";

function widthToVw(width) {
  return (width / window.innerWidth) * 100 + "vw";
}

function heightToVh(height) {
  return (height / window.innerHeight) * 100 + "vh";
}

function vwToWidth(vw) {
  return (parseFloat(vw, 10) * window.innerWidth) / 100;
}

function vhToHeight(vh) {
  return (parseFloat(vh, 10) * window.innerHeight) / 100;
}

function addToWidth(width, delta) {
  if (typeof width === "string" && width.endsWith("vw")) {
    return widthToVw(vwToWidth(width) + delta);
  }

  return parseFloat(width, 10) + delta + "px";
}

function addToHeight(height, delta) {
  if (typeof height === "string" && height.endsWith("vh")) {
    return heightToVh(vhToHeight(height) + delta);
  }

  return parseFloat(height, 10) + delta + "px";
}

function getNewSize(size, delta, { shouldUpdateWidth, shouldUpdateHeight }) {
  return {
    ...size,
    ...(shouldUpdateWidth && { width: addToWidth(size.width, delta.width) }),
    ...(shouldUpdateHeight && {
      height: addToHeight(size.height, delta.height),
    }),
  };
}

function useResizable({
  defaultWidth,
  minWidth,
  maxWidth,
  defaultHeight,
  minHeight,
  maxHeight,
  resizeTop,
  resizeRight,
}) {
  const [size, setSize] = useState({
    width: defaultWidth,
    height: defaultHeight,
  });
  const [sizeWhenResizing, setSizeWhenResizing] = useState(size);
  const Resizable = useMemo(
    () => ({ size, onResizeStop, children }) => {
      if (size.width === null || size.height === null) {
        return null;
      }

      return (
        <ReResizable
          size={size}
          minWidth={minWidth}
          maxWidth={maxWidth}
          minHeight={minHeight}
          maxHeight={maxHeight}
          enable={{
            top: !!resizeTop,
            right: !!resizeRight,
            bottom: false,
            left: false,
            topRight: false,
            bottomRight: false,
            bottomLeft: false,
            topLeft: false,
          }}
          onResize={(e, direction, ref, delta) => {
            setSizeWhenResizing(
              getNewSize(size, delta, {
                shouldUpdateWidth: !!resizeRight,
                shouldUpdateHeight: !!resizeTop,
              })
            );
          }}
          onResizeStop={(e, direction, ref, delta) => {
            const newSize = getNewSize(size, delta, {
              shouldUpdateWidth: !!resizeRight,
              shouldUpdateHeight: !!resizeTop,
            });

            setSize(newSize);

            onResizeStop && onResizeStop(newSize);
          }}
        >
          {children}
        </ReResizable>
      );
    },
    [minWidth, maxWidth, minHeight, maxHeight, resizeTop, resizeRight]
  );

  useEffect(() => {
    if (defaultWidth !== null) {
      setSize((size) => ({
        ...size,
        width: defaultWidth,
      }));
      setSizeWhenResizing((sizeWhenResizing) => ({
        ...sizeWhenResizing,
        width: defaultWidth,
      }));
    }
  }, [defaultWidth]);

  useEffect(() => {
    if (defaultHeight !== null) {
      setSize((size) => ({
        ...size,
        height: defaultHeight,
      }));
      setSizeWhenResizing((sizeWhenResizing) => ({
        ...sizeWhenResizing,
        height: defaultHeight,
      }));
    }
  }, [defaultHeight]);

  return [size, sizeWhenResizing, Resizable];
}

export default useResizable;
