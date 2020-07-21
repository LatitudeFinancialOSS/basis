import React, { useContext } from "react";

export const ThemeContext = React.createContext();

function useTheme() {
  const theme = useContext(ThemeContext);

  return theme;
}

export default useTheme;
