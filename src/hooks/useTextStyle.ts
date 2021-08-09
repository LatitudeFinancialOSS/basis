import React, { useContext } from "react";
import { TextStyleNames } from "../themes/types";
import useTheme from "./useTheme";

const TextStyleContext = React.createContext<TextStyleNames | undefined>(
  undefined
);

export const TextStyleProvider = TextStyleContext.Provider;

function useTextStyle() {
  const theme = useTheme();
  const textStyle = useContext(TextStyleContext);

  return {
    textStyle,
    textStyleCSS: theme.getTextStyleCSS(textStyle),
  };
}

export default useTextStyle;
