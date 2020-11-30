import { hasOwnProperty } from "./core";
import { TEXT_ALIGNS, FLEX_DIRECTIONS, FLEX_PLACE_ITEMS } from "./constants";

export function getGapValues(gap, theme) {
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

  const rowGapPx = theme.space[parts[0]] || "0px";
  const columnGapPx =
    parts.length === 2 ? theme.space[parts[1]] || "0px" : rowGapPx;

  return {
    rowGap: rowGapPx,
    columnGap: columnGapPx,
  };
}

function getTextAlignValue(textAlign) {
  if (TEXT_ALIGNS.includes(textAlign)) {
    return textAlign;
  }

  return null;
}

const OVERFLOW_VALUES = ["visible", "hidden", "scroll", "auto"];

function getOverflowValue(overflow) {
  const parts =
    typeof overflow === "string" ? overflow.trim().split(/\s+/) : null;
  const isValid =
    parts !== null && parts.every((part) => OVERFLOW_VALUES.includes(part));

  if (isValid) {
    return parts.join(" ");
  }

  return null;
}

const SPAN_LINES_REGEX = /^(\d+)(-(\d+))?$/;

export function getGridRowColumn(span, { allAllowed = false } = {}) {
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

export function getGapPx(gap, theme) {
  // Exception to our space scale
  if (gap === "30px") {
    return gap;
  }

  return theme.space[gap] || "0px";
}

export function getGridTemplateColumns(cols) {
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

export function compareBreakpoints(bp1, bp2, theme) {
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

export function getMinMediaQueries(breakpoints) {
  if (!breakpoints) {
    return {};
  }

  const result = {};

  for (const bp in breakpoints) {
    result[bp] = `@media (min-width: ${breakpoints[bp]})`;
  }

  return result;
}

export function getExclusiveMediaQueries(breakpoints) {
  if (!breakpoints) {
    return {};
  }

  const entries = Object.entries(breakpoints).map(([bp, px]) => ({
    bp,
    px: parseInt(px, 10),
  }));

  if (!entries[0]) {
    return {};
  }

  const result = {
    [DEFAULT_BREAKPOINT]: `(max-width: ${entries[0].px - 1}px)`,
  };
  let i, len;

  for (i = 0, len = entries.length - 1; i < len; i++) {
    result[entries[i].bp] = `(min-width: ${entries[i].px}px) and (max-width: ${
      entries[i + 1].px - 1
    }px)`;
  }

  result[entries[i].bp] = `(min-width: ${entries[i].px}px)`;

  return result;
}

function sortMediaQueries(css) {
  const result = {};
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

  return result;
}

export function mergeResponsiveCSS(css1, css2) {
  const result = {};

  for (const key in css1) {
    if (typeof css1[key] === "object") {
      result[key] = { ...css1[key] };
    } else {
      result[key] = css1[key];
    }
  }

  for (const key in css2) {
    if (typeof css2[key] === "object") {
      if (hasOwnProperty(result, key)) {
        // merge with css1
        result[key] = {
          ...result[key],
          ...css2[key],
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

function isMinMediaQuery(str) {
  return str.match(MIN_MEDIA_QUERY_REGEX) !== null;
}

export function isCSSinOrder(css) {
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

export function responsiveMargin(propsAtBreakpoint, theme) {
  const margin = theme.getSpaceValue(propsAtBreakpoint.margin);

  return margin === null ? {} : { margin };
}

export function responsivePadding(propsAtBreakpoint, theme) {
  const padding = theme.getSpaceValue(propsAtBreakpoint.padding);

  return padding === null ? {} : { padding };
}

const NUMBERS_ONLY_REGEX = /^\d+$/;

function addPxIfNeeded(str) {
  if (NUMBERS_ONLY_REGEX.test(str)) {
    return `${str}px`;
  }

  return str;
}

export const responsiveSize = (prop) => (propsAtBreakpoint) => {
  const value =
    typeof propsAtBreakpoint[prop] === "string" &&
    propsAtBreakpoint[prop].trim() !== ""
      ? addPxIfNeeded(propsAtBreakpoint[prop])
      : null;

  return value === null ? {} : { [prop]: value };
};

export function responsiveHasBreakpointWidth(
  { hasBreakpointWidth, margin },
  theme,
  bp
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

export function responsiveTextStyle(propsAtBreakpoint, theme) {
  const css = theme.getTextStyleCSS(propsAtBreakpoint.textStyle);

  return css === null ? {} : css;
}

export function responsiveTextAlign(propsAtBreakpoint) {
  const textAlign = getTextAlignValue(propsAtBreakpoint.textAlign);

  return textAlign === null ? {} : { textAlign };
}

export function responsiveOverflow(propsAtBreakpoint) {
  const overflow = getOverflowValue(propsAtBreakpoint.overflow);

  return overflow === null ? {} : { overflow };
}

export function responsiveFlexDirection({ direction }) {
  if (!FLEX_DIRECTIONS.includes(direction)) {
    return {};
  }

  return {
    flexDirection: direction,
  };
}

export function responsiveFlexPlaceItems({ direction, placeItems }) {
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
