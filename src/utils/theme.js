import {
  EXCEPTION_PREFIX,
  getMinMediaQueries,
  getExclusiveMediaQueries
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
      "& b": boldCSS
    })
  };
}

export function enhanceTheme(theme) {
  return {
    ...theme,
    minMediaQueries: getMinMediaQueries(theme.breakpoints),
    exclusiveMediaQueries: getExclusiveMediaQueries(theme.breakpoints),
    getColor: color => getColor(color, theme),
    getTextStyleCSS: textStyle => getTextStyleCSS(textStyle, theme)
  };
}
