import tokens from "../themes/tokens";
import { hasOwnProperty } from "./core";
import Flex from "../components/Flex";
import Text from "../components/Text";

const { DIRECTIONS: FLEX_DIRECTIONS, PLACE_ITEMS: FLEX_PLACE_ITEMS } = Flex;

export const EXCEPTION_PREFIX = "__exception__:";

export function getSpaceValue(space) {
  if (typeof space === "number") {
    return tokens.space[space] || "0px";
  }

  if (typeof space !== "string") {
    return null;
  }

  const parts = space.split(/\s+/).filter(Boolean);

  if (parts.length < 1 || parts.length > 4) {
    return null;
  }

  return parts
    .map(n => {
      if (n === "auto") {
        return n;
      }

      if (n[0] === "-") {
        const pxValue = tokens.space[n.slice(1)];

        return pxValue ? `-${pxValue}` : "0px";
      }

      return tokens.space[n] || "0px";
    })
    .join(" ");
}

export function getSizeValue(size) {
  if (typeof size === "number") {
    return tokens.sizes[size] || null;
  }

  if (typeof size !== "string") {
    return null;
  }

  if (size === "auto" || size === "100%") {
    return size;
  }

  return tokens.sizes[size] || null;
}

function getGutterValues(gutter) {
  if (typeof gutter === "number") {
    gutter = String(gutter);
  }

  if (typeof gutter !== "string") {
    return null;
  }

  const parts = gutter.split(/\s+/).filter(Boolean);

  if (parts.length < 1 || parts.length > 2) {
    return null;
  }

  const rowGutterPx = tokens.space[parts[0]] || "0px";
  const columnGutterPx =
    parts.length === 2 ? tokens.space[parts[1]] || "0px" : rowGutterPx;

  return {
    rowGutter: rowGutterPx,
    columnGutter: columnGutterPx
  };
}

function getTextAlignValue(textAlign) {
  if (Text.ALIGNS.includes(textAlign)) {
    return textAlign;
  }

  return null;
}

const SPAN_REGEX = /^(\d+)(-(\d+))?$/;

export function getGridLines(span, { allAllowed = false } = {}) {
  if (allAllowed && span === "all") {
    return [1, -1];
  }

  if (typeof span === "number") {
    return [span + 1, span + 2];
  }

  if (typeof span !== "string") {
    return null;
  }

  const match = span.match(SPAN_REGEX);

  if (match === null) {
    return null;
  }

  const start = parseInt(match[1], 10);
  const end = match[3] === undefined ? start : parseInt(match[3], 10);

  return [start + 1, end + 2];
}

export function getGutterPx(gutter) {
  // Exception to our tokens scale
  if (gutter === "30px") {
    return gutter;
  }

  return tokens.space[gutter] || "0px";
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

export const DEFAULT_BREAKPOINT = "default";

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
    px: parseInt(px, 10)
  }));

  if (!entries[0]) {
    return {};
  }

  const result = {
    [DEFAULT_BREAKPOINT]: `(max-width: ${entries[0].px - 1}px)`
  };
  let i, len;

  for (i = 0, len = entries.length - 1; i < len; i++) {
    result[entries[i].bp] = `(min-width: ${
      entries[i].px
    }px) and (max-width: ${entries[i + 1].px - 1}px)`;
  }

  result[entries[i].bp] = `(min-width: ${entries[i].px}px)`;

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
          ...css2[key]
        };
      } else {
        result[key] = css2[key];
      }
    } else {
      result[key] = css2[key]; // override css1
    }
  }

  return result;
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

export function responsiveMargin(propsAtBreakpoint) {
  const margin = getSpaceValue(propsAtBreakpoint.margin);

  return margin === null ? {} : { margin };
}

export function responsivePadding(propsAtBreakpoint) {
  const padding = getSpaceValue(propsAtBreakpoint.padding);

  return padding === null ? {} : { padding };
}

export function responsiveWidth(propsAtBreakpoint) {
  const width = getSizeValue(propsAtBreakpoint.width);

  return width === null ? {} : { width };
}

export function responsiveHeight(propsAtBreakpoint) {
  const height = getSizeValue(propsAtBreakpoint.height);

  return height === null ? {} : { height };
}

export function responsiveTextStyle(propsAtBreakpoint, theme) {
  const css = theme.getTextStyleCSS(propsAtBreakpoint.textStyle);

  return css === null ? {} : css;
}

export function responsiveTextAlign(propsAtBreakpoint) {
  const textAlign = getTextAlignValue(propsAtBreakpoint.textAlign);

  return textAlign === null ? {} : { textAlign };
}

export function responsiveFlexDirection({ direction }) {
  if (!FLEX_DIRECTIONS.includes(direction)) {
    return {};
  }

  return {
    flexDirection: direction
  };
}

export const responsiveFlexGutter = whatFor => ({ gutter }) => {
  const gutterValues = getGutterValues(gutter);

  if (gutterValues === null) {
    return {};
  }

  const { rowGutter, columnGutter } = gutterValues;

  if (whatFor === "items-container") {
    return {
      marginTop: `-${rowGutter}`,
      marginLeft: `-${columnGutter}`
    };
  }

  if (whatFor === "item") {
    return {
      marginTop: rowGutter,
      marginLeft: columnGutter
    };
  }

  return {};
};

export function responsiveFlexPlaceItems({ direction, placeItems }) {
  if (!FLEX_PLACE_ITEMS.includes(placeItems)) {
    return {};
  }

  const parts = placeItems.trim().split(/\s+/);

  if (parts.length === 1) {
    if (parts[0] === "center") {
      return {
        alignItems: "center",
        justifyContent: "center"
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
      justifyContent: "center"
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
      direction === "row" ? horizontalAlignment : verticalAlignment
  };
}
