import React, { useContext } from "react";
import defaultTheme from "../themes/default";
import { EnhancedTheme } from "../themes/types";
import { enhanceTheme } from "../utils/theme";

export const ThemeContext = React.createContext<EnhancedTheme>(
  enhanceTheme(defaultTheme)
);

function useTheme() {
  return useContext(ThemeContext);
}

export default useTheme;
