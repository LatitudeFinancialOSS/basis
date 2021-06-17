import React, { useContext } from "react";
import { defaultTheme } from "..";
import { BasisTheme } from "../themes/types";

export const ThemeContext = React.createContext<BasisTheme>(defaultTheme);

function useTheme() {
  const theme = useContext(ThemeContext);

  return theme;
}

export default useTheme;
