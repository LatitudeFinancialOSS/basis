import { hasOwnProperty } from "./core";
import { TEXT_ALIGNS, FLEX_DIRECTIONS, FLEX_PLACE_ITEMS } from "./constants";
import {
  BasisTheme,
  Breakpoints,
  EnhancedTheme,
  TextStyleNames,
} from "../themes/types";
import { CSSObject } from "@emotion/react";
import { Breakpoint } from "../types";

export function getGapValues(
  gap: string | number | undefined,
  theme: BasisTheme
) {
  if (typeof gap === "number") {
    gap = String(gap);
  }

  if (typeof gap !== "string") {
    return null;
  }

  const parts = gap.split(/\s+/).filter(Boolean);

  if (parts.length < 1 || parts.length > 2) {
    return null;
  }

  const rowGapPx = theme.space[Number(parts[0])] || "0px";
  const columnGapPx =
    parts.length === 2 ? theme.space[Number(parts[1])] || "0px" : rowGapPx;

  return {
    rowGap: rowGapPx,
    columnGap: columnGapPx,
  };
}

function getTextAlignValue(textAlign: typeof TEXT_ALIGNS[number]) {
  if (TEXT_ALIGNS.includes(textAlign)) {
    return textAlign;
  }

  return null;
}

const OVERFLOW_VALUES = ["visible", "hidden", "scroll", "auto"];

function getOverflowValue(overflow: string) {
  const parts =
    typeof overflow === "string" ? overflow.trim().split(/\s+/) : null;

  if (parts !== null && parts.every((part) => OVERFLOW_VALUES.includes(part))) {
    return parts.join(" ");
  }

  return null;
}

const SPAN_LINES_REGEX = /^(\d+)(-(\d+))?$/;

export function getGridRowColumn(
  span: string | number | undefined,
  { allAllowed = false } = {}
) {
  if (allAllowed && span === "all") {
    return "1 / -1";
  }

  if (typeof span === "number") {
    return `${span + 1} / ${span + 2}`;
  }

  if (typeof span !== "string") {
    return null;
  }

  const match = span.match(SPAN_LINES_REGEX);

  if (match) {
    const start = parseInt(match[1], 10);
    const end = match[3] === undefined ? start : parseInt(match[3], 10);

    return `${start + 1} / ${end + 2}`;
  }

  return span;
}

export function getGapPx(gap: string | number | undefined, theme: BasisTheme) {
  // Exception to our space scale
  if (gap === "30px") {
    return gap;
  }

  return theme.space[Number(gap)] || "0px";
}

export function getGridTemplateColumns(cols: string | number | undefined) {
  const colsInt = Number(cols);

  if (colsInt) {
    return `repeat(${colsInt}, 1fr)`;
  }

  if (typeof cols === "string") {
    return cols;
  }

  return null;
}

export const getGridTemplateRows = getGridTemplateColumns;

export const DEFAULT_BREAKPOINT = "default";

export function compareBreakpoints(
  bp1: Breakpoint,
  bp2: Breakpoint,
  theme: BasisTheme
) {
  const breakpoints = [DEFAULT_BREAKPOINT, ...Object.keys(theme.breakpoints)];
  const index1 = breakpoints.indexOf(bp1);
  const index2 = breakpoints.indexOf(bp2);

  if (index1 === -1 || index2 === -1) {
    return null;
  }

  if (index1 === index2) {
    return 0;
  }

  return index1 < index2 ? -1 : 1;
}

export function getMinMediaQueries(breakpoints: Breakpoints) {
  if (!breakpoints) {
    throw new Error("Theme expects breakpoints but none were recieved");
  }

  let result: any = {};

  let bp: Breakpoint;
  for (bp in breakpoints) {
    result[bp] = `@media (min-width: ${breakpoints[bp]})`;
  }

  return result as Record<Breakpoint, string>;
}

export function getExclusiveMediaQueries(breakpoints: Breakpoints) {
  if (!breakpoints) {
    throw new Error("Theme expects breakpoints but none were recieved");
  }

  const entries = Object.entries(breakpoints).map(([bp, px]) => ({
    bp,
    px: parseInt(px, 10),
  }));

  if (!entries[0]) {
    throw new Error("Theme expects breakpoints to be an object with values");
  }

  const result: any = {
    [DEFAULT_BREAKPOINT]: `(max-width: ${entries[0].px - 1}px)`,
  };
  let i, len;

  for (i = 0, len = entries.length - 1; i < len; i++) {
    result[entries[i].bp] = `(min-width: ${entries[i].px}px) and (max-width: ${
      entries[i + 1].px - 1
    }px)`;
  }

  result[entries[i].bp] = `(min-width: ${entries[i].px}px)`;

  return result as Record<Breakpoint, string>;
}

function sortMediaQueries(css: CSSObject) {
  const result: any = {};
  const minWidths = [];

  for (const key in css) {
    const match = key.match(/^@media \(min-width: (\d+)px\)$/);

    if (match) {
      const minWidth = parseInt(match[1], 10);

      minWidths.push(minWidth);
    } else {
      result[key] = css[key];
    }
  }

  minWidths
    .sort((a, b) => a - b)
    .forEach((minWidth) => {
      const mediaQuery = `@media (min-width: ${minWidth}px)`;

      result[mediaQuery] = css[mediaQuery];
    });

  return result as CSSObject;
}

export function mergeResponsiveCSS(css1: CSSObject, css2: CSSObject) {
  const result: any = {};

  for (const key in css1) {
    const value = css1[key];
    if (typeof value === "object") {
      result[key] = { ...value };
    } else {
      result[key] = css1[key];
    }
  }

  for (const key in css2) {
    const value = css2[key];
    if (typeof value === "object") {
      if (hasOwnProperty(result, key)) {
        // merge with css1
        result[key] = {
          ...result[key],
          ...value,
        };
      } else {
        result[key] = css2[key];
      }
    } else {
      result[key] = css2[key]; // override css1
    }
  }

  return sortMediaQueries(result);
}

const MIN_MEDIA_QUERY_REGEX = /^@media \(min-width: (\d+)px\)$/;

function isMinMediaQuery(str: string) {
  return str.match(MIN_MEDIA_QUERY_REGEX) !== null;
}

export function isCSSinOrder(css: CSSObject) {
  const keys = Object.keys(css);
  const firstMinMediaQueryIndex = keys.findIndex(isMinMediaQuery);

  if (firstMinMediaQueryIndex === -1) {
    // No min media queries found. Nothing to worry about.
    return true;
  }

  let lastBreakpoint = -1;

  for (let i = firstMinMediaQueryIndex + 1; i < keys.length; i++) {
    const match = keys[i].match(MIN_MEDIA_QUERY_REGEX);

    if (match === null) {
      // Default CSS found. It must appear BEFORE ALL media queries.
      return false;
    }

    const breakpoint = parseInt(match[1], 10);

    if (breakpoint < lastBreakpoint) {
      // Min media queries must appear in acsending order.
      return false;
    }

    lastBreakpoint = breakpoint;
  }

  return true;
}

export function responsiveMargin(
  propsAtBreakpoint: { margin?: string | number },
  theme: EnhancedTheme
) {
  const margin = theme.getSpaceValue(propsAtBreakpoint.margin);

  return margin === null ? {} : { margin };
}

export function responsivePadding(
  propsAtBreakpoint: { padding?: string | number },
  theme: EnhancedTheme
) {
  const padding = theme.getSpaceValue(propsAtBreakpoint.padding);

  return padding === null ? {} : { padding };
}

const NUMBERS_ONLY_REGEX = /^\d+$/;

function addPxIfNeeded(str: string) {
  if (NUMBERS_ONLY_REGEX.test(str)) {
    return `${str}px`;
  }

  return str;
}

export const responsiveSize = (prop: string) => (
  propsAtBreakpoint: Record<string, any>
) => {
  const value =
    typeof propsAtBreakpoint[prop] === "string" &&
    propsAtBreakpoint[prop].trim() !== ""
      ? addPxIfNeeded(propsAtBreakpoint[prop])
      : null;

  return value === null ? {} : { [prop]: value };
};

export function responsiveHasBreakpointWidth(
  {
    hasBreakpointWidth,
    margin,
  }: { hasBreakpointWidth: boolean; margin: string },
  theme: BasisTheme,
  bp: Exclude<Breakpoint, "xs"> | "default"
) {
  if (hasBreakpointWidth !== true) {
    if (margin) {
      return {
        maxWidth: "initial",
      };
    }

    return {
      maxWidth: "initial",
      marginLeft: "initial",
      marginRight: "initial",
    };
  }

  if (bp === DEFAULT_BREAKPOINT || !theme.breakpointMaxWidths[bp]) {
    return {
      marginLeft: "15px", // This is half of our special 30px columns gap.
      marginRight: "15px",
    };
  }

  return {
    maxWidth: theme.breakpointMaxWidths[bp],
    marginLeft: "auto",
    marginRight: "auto",
  };
}

export function responsiveTextStyle(
  propsAtBreakpoint: { textStyle: TextStyleNames | undefined },
  theme: EnhancedTheme
) {
  const css = theme.getTextStyleCSS(propsAtBreakpoint.textStyle);

  return css === null ? {} : css;
}

export function responsiveTextAlign(propsAtBreakpoint: {
  textAlign: typeof TEXT_ALIGNS[number];
}) {
  const textAlign = getTextAlignValue(propsAtBreakpoint.textAlign);

  return textAlign === null ? {} : { textAlign };
}

export function responsiveOverflow(propsAtBreakpoint: { overflow: string }) {
  const overflow = getOverflowValue(propsAtBreakpoint.overflow);

  return overflow === null ? {} : { overflow };
}

export function responsiveFlexDirection({
  direction,
}: {
  direction: typeof FLEX_DIRECTIONS[number];
}) {
  if (!FLEX_DIRECTIONS.includes(direction)) {
    return {};
  }

  return {
    flexDirection: direction,
  };
}

export function responsiveFlexPlaceItems({
  direction,
  placeItems,
}: {
  direction: typeof FLEX_DIRECTIONS[number];
  placeItems: typeof FLEX_PLACE_ITEMS[number];
}) {
  if (!FLEX_PLACE_ITEMS.includes(placeItems)) {
    return {};
  }

  const parts = placeItems.trim().split(/\s+/);

  if (parts.length === 1) {
    if (parts[0] === "center") {
      return {
        alignItems: "center",
        justifyContent: "center",
      };
    }

    return {};
  }

  if (parts.length !== 2) {
    return {};
  }

  if (parts[0] === "center" && parts[1] === "center") {
    return {
      alignItems: "center",
      justifyContent: "center",
    };
  }

  const hasLeft = parts[0] === "left" || parts[1] === "left";
  const hasRight = parts[0] === "right" || parts[1] === "right";
  const hasTop = parts[0] === "top" || parts[1] === "top";
  const hasBottom = parts[0] === "bottom" || parts[1] === "bottom";
  const horizontalAlignment = hasLeft
    ? "flex-start"
    : hasRight
    ? "flex-end"
    : "center";
  const verticalAlignment = hasTop
    ? "flex-start"
    : hasBottom
    ? "flex-end"
    : "center";

  return {
    alignItems: direction === "row" ? verticalAlignment : horizontalAlignment,
    justifyContent:
      direction === "row" ? horizontalAlignment : verticalAlignment,
  };
}
