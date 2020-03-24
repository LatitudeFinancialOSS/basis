import React, { useContext } from "react";
import useTheme from "./useTheme";

const TextStyleContext = React.createContext();

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
