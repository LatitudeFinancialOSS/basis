import React, { useMemo } from "react";
import PropTypes from "prop-types";
import WindowProvider from "./WindowProvider";
import BreakpointProvider from "./BreakpointProvider";
import LinkProvider from "./LinkProvider";
import { ThemeContext } from "../hooks/useTheme";
import { enhanceTheme } from "../utils/theme";
import FocusVisiblePolyfill from "../components/internal/FocusVisiblePolyfill";

function BasisProvider({
  theme,
  isRoot = false,
  window,
  InternalLink,
  isLinkInternal,
  children,
}) {
  const enhancedTheme = useMemo(() => enhanceTheme(theme), [theme]);
  const content = isRoot ? (
    <div data-basis-modal-app>{children}</div>
  ) : (
    children
  );

  return (
    <ThemeContext.Provider value={enhancedTheme}>
      <WindowProvider window={window}>
        <FocusVisiblePolyfill />
        <BreakpointProvider>
          <LinkProvider
            InternalLink={InternalLink}
            isLinkInternal={isLinkInternal}
          >
            {content}
          </LinkProvider>
        </BreakpointProvider>
      </WindowProvider>
    </ThemeContext.Provider>
  );
}

BasisProvider.propTypes = {
  theme: PropTypes.object.isRequired,
  isRoot: PropTypes.bool,
  window: PropTypes.object,
  InternalLink: PropTypes.elementType,
  isLinkInternal: PropTypes.func,
  children: PropTypes.node.isRequired,
};

export default BasisProvider;
