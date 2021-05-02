import { klona as deepClone } from "klona";
import deepMerge from "deepmerge";
import { detailedDiff } from "deep-object-diff";
import useTheme from "./useTheme";
import { DEFAULT_BREAKPOINT } from "../utils/css";
import { hasOwnProperty, isObjectEmpty } from "../utils/core";

// @ts-ignore
function getResponsiveProp(prop, breakpoints) {
  for (let i = 0; i < breakpoints.length; i++) {
    const responsiveSuffix = `-${breakpoints[i]}`;

    if (prop.endsWith(responsiveSuffix)) {
      return prop.slice(0, -responsiveSuffix.length);
    }
  }

  return prop;
}

// @ts-ignore
function getResponsiveProps(props, breakpoints) {
  const result = {};

  for (const prop in props) {
    // @ts-ignore
    result[getResponsiveProp(prop, breakpoints)] = true;
  }

  return result;
}

// @ts-ignore
function hasAnyBreakpoint(prop, breakpoints) {
  // @ts-ignore
  return breakpoints.some((bp) => prop.endsWith(`-${bp}`));
}

// @ts-ignore
function getDefaultBreakpointProps(props, breakpoints) {
  const result = { ...props };

  for (const prop in result) {
    if (hasAnyBreakpoint(prop, breakpoints)) {
      delete result[prop];
    }
  }

  return result;
}

// @ts-ignore
export function getBreakpointToPropsMap(theme, props, defaultProps) {
  const breakpoints = Object.keys(theme.breakpoints);
  /*
    If `props` is { "height-sm": "40px" }, `getResponsiveProps` will include "height".
    But, `getDefaultBreakpointProps` will not.
  */
  const nonBreakpointProps = getResponsiveProps(props, breakpoints);
  let lastBreakpointProps = getDefaultBreakpointProps(props, breakpoints);
  const result = {
    [DEFAULT_BREAKPOINT]: {
      ...defaultProps,
      ...lastBreakpointProps,
    },
  };

  breakpoints.forEach((bp) => {
    // @ts-ignore
    result[bp] = {
      ...defaultProps,
      ...lastBreakpointProps,
    };

    for (const prop in nonBreakpointProps) {
      const propAtBreakpoint = `${prop}-${bp}`;

      if (hasOwnProperty(props, propAtBreakpoint)) {
        // @ts-ignore
        result[bp][prop] = props[propAtBreakpoint];
      }
    }

    // @ts-ignore
    lastBreakpointProps = result[bp];
  });

  return result;
}

// @ts-ignore
function getCSSforBreakpoint(responsiveProps, propsAtBreakpoint, theme, bp) {
  let result = {};

  for (const prop in responsiveProps) {
    result = {
      ...result,
      ...responsiveProps[prop](propsAtBreakpoint, theme, bp),
    };
  }

  return result;
}

// @ts-ignore
function removeRedundantCSS(newCSS, existingCSS, mediaQueries) {
  let remainingNewCSS = deepClone(newCSS);
  let result = {};

  for (
    let i = mediaQueries.length - 1;
    i >= 0 && !isObjectEmpty(remainingNewCSS);
    i--
  ) {
    const breakpointCSS = existingCSS[mediaQueries[i]] || {};
    // @ts-ignore
    const { added, updated } = detailedDiff(breakpointCSS, remainingNewCSS); // The order is important here

    result = deepMerge(result, updated);
    remainingNewCSS = added;
  }

  result = deepMerge(result, remainingNewCSS);

  return result;
}

const DEFAULT_BREAKPOINT_MEDIA_QUERY_PLACEHOLDER = "";

// @ts-ignore
function useResponsivePropsCSS(props, defaultProps, responsiveProps) {
  const theme = useTheme();
  const breakpointToPropsMap = getBreakpointToPropsMap(
    theme,
    props,
    defaultProps
  );
  const breakpoints = [DEFAULT_BREAKPOINT].concat(
    Object.keys(theme.minMediaQueries)
  );
  let result = {};

  for (let i = 0; i < breakpoints.length; i++) {
    const bp = breakpoints[i];
    const newCSS = getCSSforBreakpoint(
      responsiveProps,
      // @ts-ignore
      breakpointToPropsMap[bp],
      theme,
      bp
    );
    const necessaryNewCSS = removeRedundantCSS(
      newCSS,
      result,
      breakpoints
        .slice(0, i)
        .map(
          (bp) =>
            theme.minMediaQueries[bp] ||
            DEFAULT_BREAKPOINT_MEDIA_QUERY_PLACEHOLDER
        )
    );

    if (!isObjectEmpty(necessaryNewCSS)) {
      // @ts-ignore
      result[
        theme.minMediaQueries[bp] || DEFAULT_BREAKPOINT_MEDIA_QUERY_PLACEHOLDER
      ] = necessaryNewCSS;
    }
  }

  /*
    Note: The merge order is important here!
          Media queries should come after the default CSS.
          Also, the media queries should be in order.

    If the default CSS was placed after the media queries, e.g.:

      {
        "@media (min-width: 576px)": {
          height: "24px"
        },
        height: "48px"
      }

    the media query definition would be overridden by Order of Appearance (https://www.w3.org/TR/css-cascade-3/#cascade-order).

    Is the media queries were is the wrong order, e.g.:

      {
        "@media (min-width: 576px)": {
          height: "24px"
        },
        "@media (min-width: 375px)": {
          height: "48px"
        }
      }

    on screen sizes >= 576px, the height would be 48px, which is wrong.
  */
  result = {
    // @ts-ignore
    ...result[DEFAULT_BREAKPOINT_MEDIA_QUERY_PLACEHOLDER],
    ...result,
  };

  // @ts-ignore
  delete result[DEFAULT_BREAKPOINT_MEDIA_QUERY_PLACEHOLDER];

  return result;
}

export default useResponsivePropsCSS;
