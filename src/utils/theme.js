import mem from "mem";
import { getMinMediaQueries, getExclusiveMediaQueries } from "./css";
import { getPath } from "./objectPath";

function getColor(colorName, theme) {
  if (typeof colorName !== "string" || colorName === "transparent") {
    return null;
  }

  return getPath(theme.colors, colorName);
}

function getTextStyleCSS(textStyle, theme) {
  if (typeof textStyle !== "string") {
    return null;
  }

  const boldCSS = theme.textStyles[`${textStyle}.bold`];

  return {
    ...theme.textStyles[textStyle],
    ...(boldCSS && {
      "& strong": boldCSS,
      "& b": boldCSS,
    }),
  };
}

function getSpaceValue(space, theme) {
  if (typeof space === "number") {
    return theme.space[space] || "0px";
  }

  if (typeof space !== "string") {
    return null;
  }

  const parts = space.split(/\s+/).filter(Boolean);

  if (parts.length < 1 || parts.length > 4) {
    return null;
  }

  return parts
    .map((n) => {
      if (n === "auto") {
        return n;
      }

      if (n[0] === "-") {
        const pxValue = theme.space[n.slice(1)];

        return pxValue ? `-${pxValue}` : "0px";
      }

      return theme.space[n] || "0px";
    })
    .join(" ");
}

function memoizeGetCSS(theme) {
  const result = {};

  for (const key in theme) {
    if (typeof theme[key].getCSS === "function") {
      const { getCSS, ...rest } = theme[key];
      const memoizedGetCSS = mem(getCSS, { cacheKey: JSON.stringify });

      result[key] = {
        getCSS: memoizedGetCSS,
        ...rest,
      };
    } else {
      result[key] = theme[key];
    }
  }

  return result;
}

export function enhanceTheme(theme) {
  theme = memoizeGetCSS(theme);

  return {
    ...theme,
    minMediaQueries: getMinMediaQueries(theme.breakpoints),
    exclusiveMediaQueries: getExclusiveMediaQueries(theme.breakpoints),
    getColor: (color) => getColor(color, theme),
    getTextStyleCSS: (textStyle) => getTextStyleCSS(textStyle, theme),
    getSpaceValue: (space) => getSpaceValue(space, theme),
  };
}
