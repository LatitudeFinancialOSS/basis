import React, { useMemo } from "react";
import PropTypes from "prop-types";
import BreakpointProvider from "./BreakpointProvider";
import LinkProvider from "./LinkProvider";
import { enhanceTheme } from "../utils/theme";

export const ThemeContext = React.createContext();

function BasisProvider({
  theme,
  window,
  InternalLink,
  isLinkInternal,
  children,
}) {
  const enhancedTheme = useMemo(() => enhanceTheme(theme), [theme]);

  return (
    <ThemeContext.Provider value={enhancedTheme}>
      <BreakpointProvider window={window}>
        <LinkProvider
          InternalLink={InternalLink}
          isLinkInternal={isLinkInternal}
        >
          {children}
        </LinkProvider>
      </BreakpointProvider>
    </ThemeContext.Provider>
  );
}

BasisProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  window: PropTypes.object,
  InternalLink: PropTypes.elementType,
  isLinkInternal: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default BasisProvider;
