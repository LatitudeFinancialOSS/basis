import tokens from "../themes/tokens";
import {
  EXCEPTION_PREFIX,
  getMinMediaQueries,
  getExclusiveMediaQueries
} from "./css";

function getColor(colorName) {
  if (typeof colorName !== "string") {
    return null;
  }

  if (colorName.startsWith(EXCEPTION_PREFIX)) {
    colorName = colorName.slice(EXCEPTION_PREFIX.length);
  }

  const parts = colorName.split(".");
  let result = tokens.colors;

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
    getColor,
    getTextStyleCSS: textStyle => getTextStyleCSS(textStyle, theme)
  };
}
