import React, { useMemo } from "react";
import PropTypes from "prop-types";
import BreakpointProvider from "./BreakpointProvider";
import { enhanceTheme } from "../utils/theme";

export const ThemeContext = React.createContext();

function ThemeProvider({ theme, window, children }) {
  const enhancedTheme = useMemo(() => enhanceTheme(theme), [theme]);

  return (
    <ThemeContext.Provider value={enhancedTheme}>
      <BreakpointProvider window={window}>{children}</BreakpointProvider>
    </ThemeContext.Provider>
  );
}

ThemeProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  window: PropTypes.object,
  children: PropTypes.node.isRequired
};

export default ThemeProvider;
