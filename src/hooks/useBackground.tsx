import React, { useContext } from "react";
import useTheme from "./useTheme";
import { DEFAULT_BREAKPOINT } from "../utils/css";
import { Color, EnhancedTheme } from "../themes/types";
import { Breakpoint } from "../types";

function getInputColor(backgroundColor: Color | undefined) {
  return [undefined, "transparent", "white"].includes(backgroundColor)
    ? "grey.t05"
    : "white";
}

type BackgroundMap = Record<Breakpoint | typeof DEFAULT_BREAKPOINT, Color>;

export function mapResponsiveValues(
  map: BackgroundMap | undefined,
  mapFn: (color?: Color) => Color,
  theme: EnhancedTheme
) {
  if (map) {
    const result: any = {
      [DEFAULT_BREAKPOINT]: mapFn(map[DEFAULT_BREAKPOINT]),
    };

    let bp: Breakpoint;
    for (bp in theme.breakpoints) {
      result[bp] = mapFn(map[bp]);
    }

    return result as BackgroundMap;
  }

  const defaultValue = mapFn();
  const result: any = {
    [DEFAULT_BREAKPOINT]: defaultValue,
  };

  for (const bp in theme.breakpoints) {
    result[bp] = defaultValue;
  }

  return result as BackgroundMap;
}

function getBgMapFromValue(value: Color, theme: EnhancedTheme): BackgroundMap {
  const result: any = {
    [DEFAULT_BREAKPOINT]: value,
  };

  for (const bp in theme.breakpoints) {
    result[bp] = value;
  }

  return result as BackgroundMap;
}

const BackgroundContext = React.createContext<BackgroundMap | undefined>(
  undefined
);

type BackgroundProps = {
  value: Color | BackgroundMap;
  children: React.ReactNode;
};

export function BackgroundProvider({ value, children }: BackgroundProps) {
  const theme = useTheme();
  const bgMap =
    typeof value === "object" ? value : getBgMapFromValue(value, theme);

  return (
    <BackgroundContext.Provider value={bgMap}>
      {children}
    </BackgroundContext.Provider>
  );
}

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
