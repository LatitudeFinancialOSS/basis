import { klona as deepClone } from "klona";
import deepMerge from "deepmerge";
import { detailedDiff } from "deep-object-diff";
import useTheme from "./useTheme";
import { DEFAULT_BREAKPOINT } from "../utils/css";
import { isObjectEmpty } from "../utils/core";
import { CSSObject } from "@emotion/serialize";
import { Breakpoint } from "../types";
import { EnhancedTheme } from "../themes/types";

type BreakpointWithDefault = Breakpoint | typeof DEFAULT_BREAKPOINT;

type BreakpointToPropsMap<T> = Record<BreakpointWithDefault, Partial<T>>;

// @ts-ignore
export function getBreakpointToPropsMap<T extends Record<string, any>>(
  theme: EnhancedTheme,
  props: T,
  defaultProps: Partial<T>
) {
  const breakpoints = Object.entries(theme.breakpoints)
    .sort((a, b) => a[1].localeCompare(b[1], "en", { numeric: true }))
    .map(([bp]) => bp) as Breakpoint[];

  /*
    If `props` is { "height-sm": "40px" }, `getResponsiveProps` will include "height".
    But, `getDefaultBreakpointProps` will not.
  */

  const breakpointsWithDefault: BreakpointWithDefault[] = [
    DEFAULT_BREAKPOINT,
    ...breakpoints,
  ];
  const result: BreakpointToPropsMap<T> = Object.fromEntries(
    breakpointsWithDefault.map((bp) => [bp, {}])
  ) as BreakpointToPropsMap<T>;

  const allProps = {
    ...defaultProps,
    ...props,
  };

  Object.entries(allProps).forEach(([prop, value]) => {
    const startIndex = breakpoints.findIndex((bp) => prop.endsWith(`-${bp}`)); // -1

    // adding 1 because of adding the default breakpoint
    let i = startIndex === -1 ? 0 : startIndex + 1;
    const propWithoutSuffix =
      startIndex === -1
        ? prop
        : prop.slice(0, -`-${breakpoints[startIndex]}`.length);

    for (i; i < breakpointsWithDefault.length; i += 1) {
      const breakpoint = breakpointsWithDefault[i];
      result[breakpoint][propWithoutSuffix as keyof T] = value;
    }
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

type ResponsiveProp<T extends Record<string, any>> = (
  propsAtBreakPoint: T,
  theme: EnhancedTheme,
  breakPoint: Breakpoint
) => CSSObject;

const useResponsivePropsCSS = <T extends Record<string, any>>(
  props: T,
  defaultProps: Partial<T>,
  responsiveProps: Record<string, ResponsiveProp<T>>
) => {
  const theme = useTheme();
  const breakpointToPropsMap = getBreakpointToPropsMap(
    theme,
    props,
    defaultProps
  );
  const breakpoints = [DEFAULT_BREAKPOINT].concat(
    Object.keys(theme.minMediaQueries)
  );
  let result: CSSObject = {};

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
      breakpoints.slice(0, i).map(
        (bp) =>
          // @ts-ignore
          theme.minMediaQueries[bp] ||
          DEFAULT_BREAKPOINT_MEDIA_QUERY_PLACEHOLDER
      )
    );

    if (!isObjectEmpty(necessaryNewCSS)) {
      // @ts-ignore
      result[
        // @ts-ignore
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
};

export default useResponsivePropsCSS;
