import { useContext } from "react";
import { ThemeContext } from "../providers/ThemeProvider";

function useTheme() {
  const theme = useContext(ThemeContext);

  return theme;
}

export default useTheme;
