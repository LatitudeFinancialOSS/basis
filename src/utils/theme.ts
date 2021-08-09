import { CSSObject } from "@emotion/react";
import mem from "mem";
import {
  BasisTheme,
  Color,
  EnhancedTheme,
  TextStyleNames,
} from "../themes/types";
import { getMinMediaQueries, getExclusiveMediaQueries } from "./css";
import { getPath } from "./objectPath";

function getColor(colorName: Color | "transparent", theme: BasisTheme) {
  if (typeof colorName !== "string" || colorName === "transparent") {
    return null;
  }

  return getPath(theme.colors, colorName) as string;
}

function getTextStyleCSS(
  textStyle: TextStyleNames | undefined,
  theme: BasisTheme
): CSSObject | null {
  if (typeof textStyle !== "string") {
    return null;
  }

  const boldCSS = theme.textStyles[`${textStyle}.bold` as const];

  return {
    ...theme.textStyles[textStyle],
    ...(boldCSS &&
      ({
        "& strong": boldCSS,
        "& b": boldCSS,
      } as const)),
  } as const;
}

function getSpaceValue(space: number | string | undefined, theme: BasisTheme) {
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
        const pxValue = theme.space[(n.slice(1) as any) as number];

        return pxValue ? `-${pxValue}` : "0px";
      }

      return theme.space[(n as any) as number] || "0px";
    })
    .join(" ");
}

function memoizeGetCSS(theme: any) {
  const result: any = {};

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

export function enhanceTheme(theme: BasisTheme): EnhancedTheme {
  theme = memoizeGetCSS(theme);

  return {
    ...theme,
    minMediaQueries: getMinMediaQueries(theme.breakpoints),
    exclusiveMediaQueries: getExclusiveMediaQueries(theme.breakpoints),
    getColor: (color: Color) => getColor(color, theme),
    getTextStyleCSS: (textStyle: TextStyleNames | undefined) =>
      getTextStyleCSS(textStyle, theme),
    getSpaceValue: (space: string | number | undefined) =>
      getSpaceValue(space, theme),
  };
}
