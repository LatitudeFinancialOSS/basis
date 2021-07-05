import { BasisTheme } from "../types";

export default (
  theme: Pick<
    BasisTheme,
    "fonts" | "fontWeights" | "fontSizes" | "lineHeights" | "letterSpacings"
  >
) =>
  ({
    hero: {
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.semiBold,
      fontSize: theme.fontSizes[8],
      lineHeight: theme.lineHeights[7],
      letterSpacing: theme.letterSpacings.hero,
    },
    // This is needed in order to override browser's default
    "hero.bold": {
      fontWeight: theme.fontWeights.semiBold,
    },
    heading1: {
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.semiBold,
      fontSize: theme.fontSizes[7],
      lineHeight: theme.lineHeights[6],
      letterSpacing: theme.letterSpacings.heading1,
    },
    "heading1.bold": {
      fontWeight: theme.fontWeights.semiBold,
    },
    heading2: {
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.semiBold,
      fontSize: theme.fontSizes[6],
      lineHeight: theme.lineHeights[5],
      letterSpacing: theme.letterSpacings.heading2,
    },
    "heading2.bold": {
      fontWeight: theme.fontWeights.semiBold,
    },
    heading3: {
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.semiBold,
      fontSize: theme.fontSizes[5],
      lineHeight: theme.lineHeights[4],
      letterSpacing: theme.letterSpacings.heading3,
    },
    "heading3.bold": {
      fontWeight: theme.fontWeights.semiBold,
    },
    heading4: {
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.semiBold,
      fontSize: theme.fontSizes[4],
      lineHeight: theme.lineHeights[3],
      letterSpacing: theme.letterSpacings.heading4,
    },
    "heading4.bold": {
      fontWeight: theme.fontWeights.semiBold,
    },
    heading5: {
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.semiBold,
      fontSize: theme.fontSizes[3],
      lineHeight: theme.lineHeights[2],
      letterSpacing: theme.letterSpacings.heading5,
    },
    "heading5.bold": {
      fontWeight: theme.fontWeights.semiBold,
    },
    heading6: {
      fontFamily: theme.fonts.heading,
      fontWeight: theme.fontWeights.semiBold,
      fontSize: theme.fontSizes[1],
      lineHeight: theme.lineHeights[1],
      letterSpacing: theme.letterSpacings.heading6,
    },
    "heading6.bold": {
      fontWeight: theme.fontWeights.semiBold,
    },
    subtitle1: {
      fontFamily: theme.fonts.body,
      fontWeight: theme.fontWeights.light,
      fontSize: theme.fontSizes[4],
      lineHeight: theme.lineHeights[4],
      letterSpacing: theme.letterSpacings.body,
    },
    "subtitle1.bold": {
      fontWeight: theme.fontWeights.medium,
    },
    subtitle2: {
      fontFamily: theme.fonts.body,
      fontWeight: theme.fontWeights.light,
      fontSize: theme.fontSizes[2],
      lineHeight: theme.lineHeights[3],
      letterSpacing: theme.letterSpacings.body,
    },
    "subtitle2.bold": {
      fontWeight: theme.fontWeights.medium,
    },
    body1: {
      fontFamily: theme.fonts.body,
      fontWeight: theme.fontWeights.light,
      fontSize: theme.fontSizes[1],
      lineHeight: theme.lineHeights[2],
      letterSpacing: theme.letterSpacings.body,
    },
    "body1.bold": {
      fontWeight: theme.fontWeights.medium,
    },
    body2: {
      fontFamily: theme.fonts.body,
      fontWeight: theme.fontWeights.light,
      fontSize: theme.fontSizes[0],
      lineHeight: theme.lineHeights[0],
      letterSpacing: theme.letterSpacings.body,
    },
    "body2.bold": {
      fontWeight: theme.fontWeights.medium,
    },
    legal: {
      fontFamily: theme.fonts.body,
      fontWeight: theme.fontWeights.light,
      fontSize: theme.fontSizes[0],
      lineHeight: theme.lineHeights[2],
      letterSpacing: theme.letterSpacings.body,
    },
    "legal.bold": {
      fontWeight: theme.fontWeights.medium,
    },
    overline: {
      fontFamily: theme.fonts.body,
      fontWeight: theme.fontWeights.bold,
      fontSize: theme.fontSizes[0],
      lineHeight: theme.lineHeights[0],
      letterSpacing: theme.letterSpacings.overline,
      textTransform: "uppercase",
    },
    "overline.bold": {
      fontWeight: theme.fontWeights.bold,
    },
  } as const);
