import useTheme from "./useTheme";
import { DEFAULT_BREAKPOINT } from "../utils/css";
import { hasOwnProperty } from "../utils/core";

function getCSSforBreakpoint(bp, props, responsiveProps) {
  let result = {};

  for (const responsiveProp in responsiveProps) {
    const { getCSS, defaultValue } = responsiveProps[responsiveProp];
    const actualProp =
      bp === DEFAULT_BREAKPOINT ? responsiveProp : `${responsiveProp}-${bp}`;

    if (hasOwnProperty(props, actualProp)) {
      result = {
        ...result,
        ...getCSS(props[actualProp])
      };
    } else if (
      bp === DEFAULT_BREAKPOINT &&
      typeof defaultValue !== "undefined"
    ) {
      result = {
        ...result,
        ...getCSS(defaultValue)
      };
    }
  }

  return result;
}

function useResponsivePropsCSS(props, responsiveProps) {
  const theme = useTheme();
  const result = getCSSforBreakpoint(
    DEFAULT_BREAKPOINT,
    props,
    responsiveProps
  );

  for (const bp in theme.minMediaQueries) {
    const mediaQueryCSS = getCSSforBreakpoint(bp, props, responsiveProps);

    if (Object.keys(mediaQueryCSS).length > 0) {
      result[theme.minMediaQueries[bp]] = mediaQueryCSS;
    }
  }

  return result;
}

export default useResponsivePropsCSS;
