import React, { useContext } from "react";
import useTheme from "./useTheme";
import { getStickyItemCSS } from "../utils/sticky";

const StickyContext = React.createContext();

export const StickyProvider = StickyContext.Provider;

function useSticky({ id, heightMap }) {
  const theme = useTheme();
  const stickyInfo = useContext(StickyContext);

  if (!stickyInfo) {
    throw new Error("Sticky.Item must be placed inside Sticky.");
  }

  const calculatedOffsetMap = stickyInfo.offsetMap[id];
  const css = getStickyItemCSS({
    heightMap,
    offsetMap: calculatedOffsetMap ?? stickyInfo.accumulativeOffsetMap,
    theme,
  });

  if (!calculatedOffsetMap) {
    stickyInfo.updateOffsetMap(id, heightMap);
  }

  return {
    css,
  };
}

export default useSticky;
