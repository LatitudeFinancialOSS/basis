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

  const css = getStickyItemCSS({
    heightMap,
    offsetMap: stickyInfo.offsetMap,
    theme,
  });

  stickyInfo.updateOffsetMap(id, heightMap);

  return {
    css,
  };
}

export default useSticky;
