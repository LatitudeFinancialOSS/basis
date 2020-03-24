import {
  EXCEPTION_PREFIX,
  getMinMediaQueries,
  getExclusiveMediaQueries,
} from "./css";

function getColor(colorName, theme) {
  if (typeof colorName !== "string") {
    return null;
  }

  if (colorName.startsWith(EXCEPTION_PREFIX)) {
    colorName = colorName.slice(EXCEPTION_PREFIX.length);
  }

  const parts = colorName.split(".");
  let result = theme.colors;

  for (let i = 0, len = parts.length; i < len; i++) {
    result = result[parts[i]];

    if (!result) {
      return null;
    }
  }

  return result;
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

export function enhanceTheme(theme) {
  return {
    ...theme,
    minMediaQueries: getMinMediaQueries(theme.breakpoints),
    exclusiveMediaQueries: getExclusiveMediaQueries(theme.breakpoints),
    getColor: (color) => getColor(color, theme),
    getTextStyleCSS: (textStyle) => getTextStyleCSS(textStyle, theme),
    getSpaceValue: (space) => getSpaceValue(space, theme),
  };
}
