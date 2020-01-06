import tokens from "../themes/tokens";

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
    .map(n => (n === "auto" ? n : tokens.space[n] || "0px"))
    .join(" ");
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
      /*
        ESLint complains about:
          result.hasOwnProperty[key]
        
        See: https://eslint.org/docs/rules/no-prototype-builtins
      */
      if (Object.prototype.hasOwnProperty.call(result, key)) {
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
