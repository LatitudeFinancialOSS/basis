import tokens from "./tokens";

export default theme => ({
  hero: {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: theme.fontSizes[8],
    lineHeight: theme.lineHeights[7],
    letterSpacing: tokens.letterSpacings.hero
  },
  // This is needed in order to override browser's default
  "hero.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  heading1: {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: theme.fontSizes[7],
    lineHeight: theme.lineHeights[6],
    letterSpacing: tokens.letterSpacings.heading1
  },
  "heading1.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  heading2: {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: theme.fontSizes[6],
    lineHeight: theme.lineHeights[5],
    letterSpacing: tokens.letterSpacings.heading2
  },
  "heading2.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  heading3: {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: theme.fontSizes[5],
    lineHeight: theme.lineHeights[4],
    letterSpacing: tokens.letterSpacings.heading3
  },
  "heading3.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  heading4: {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: theme.fontSizes[4],
    lineHeight: theme.lineHeights[3],
    letterSpacing: tokens.letterSpacings.heading4
  },
  "heading4.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  heading5: {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: theme.fontSizes[3],
    lineHeight: theme.lineHeights[2],
    letterSpacing: tokens.letterSpacings.heading5
  },
  "heading5.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  heading6: {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: theme.fontSizes[1],
    lineHeight: theme.lineHeights[1],
    letterSpacing: tokens.letterSpacings.heading6
  },
  "heading6.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  subtitle1: {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: theme.fontSizes[4],
    lineHeight: theme.lineHeights[4],
    letterSpacing: tokens.letterSpacings.body
  },
  "subtitle1.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  subtitle2: {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: theme.fontSizes[2],
    lineHeight: theme.lineHeights[3],
    letterSpacing: tokens.letterSpacings.body
  },
  "subtitle2.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  body1: {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: theme.fontSizes[1],
    lineHeight: theme.lineHeights[2],
    letterSpacing: tokens.letterSpacings.body
  },
  "body1.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  body2: {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: theme.fontSizes[0],
    lineHeight: theme.lineHeights[0],
    letterSpacing: tokens.letterSpacings.body
  },
  "body2.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  legal: {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: theme.fontSizes[0],
    lineHeight: theme.lineHeights[2],
    letterSpacing: tokens.letterSpacings.body
  },
  "legal.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  overline: {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.bold,
    fontSize: theme.fontSizes[0],
    lineHeight: theme.lineHeights[0],
    letterSpacing: tokens.letterSpacings.overline,
    textTransform: "uppercase"
  },
  "overline.bold": {
    fontWeight: tokens.fontWeights.bold
  }
});
