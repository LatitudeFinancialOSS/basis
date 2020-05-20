import React, { useContext } from "react";
import PropTypes from "prop-types";
import useTheme from "./useTheme";
import { DEFAULT_BREAKPOINT } from "../utils/css";

function getInputColor(backgroundColor) {
  return [undefined, "transparent", "white"].includes(backgroundColor)
    ? "grey.t05"
    : "white";
}

export function mapResponsiveValues(map, mapFn, theme) {
  if (map) {
    const result = {
      [DEFAULT_BREAKPOINT]: mapFn(map[DEFAULT_BREAKPOINT]),
    };

    for (const bp in theme.breakpoints) {
      result[bp] = mapFn(map[bp]);
    }

    return result;
  }

  const defaultValue = mapFn();
  const result = {
    [DEFAULT_BREAKPOINT]: defaultValue,
  };

  for (const bp in theme.breakpoints) {
    result[bp] = defaultValue;
  }

  return result;
}

function getBgMapFromValue(value, theme) {
  const result = {
    [DEFAULT_BREAKPOINT]: value,
  };

  for (const bp in theme.breakpoints) {
    result[bp] = value;
  }

  return result;
}

const BackgroundContext = React.createContext();

export function BackgroundProvider({ value, children }) {
  const theme = useTheme();
  const bgMap =
    typeof value === "object" ? value : getBgMapFromValue(value, theme);

  return (
    <BackgroundContext.Provider value={bgMap}>
      {children}
    </BackgroundContext.Provider>
  );
}

BackgroundProvider.propTypes = {
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node,
};

function useBackground() {
  const theme = useTheme();
  const bgMap = useContext(BackgroundContext);
  const inputColorMap = mapResponsiveValues(bgMap, getInputColor, theme);

  return {
    bgMap,
    inputColorMap,
  };
}

export default useBackground;
