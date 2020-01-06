import tokens from "../themes/tokens";
import { getMinMediaQueries, getExclusiveMediaQueries } from "./css";

function getColor(colorName) {
  if (typeof colorName !== "string") {
    return null;
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

export function enhanceTheme(theme) {
  return {
    ...theme,
    minMediaQueries: getMinMediaQueries(theme.breakpoints),
    exclusiveMediaQueries: getExclusiveMediaQueries(theme.breakpoints),
    getColor
  };
}
