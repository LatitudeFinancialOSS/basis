import tokens from "../tokens";

export default {
  text: {
    margin: 0
  },
  // intent
  "text.hero": {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: tokens.fontSizes[8],
    lineHeight: tokens.lineHeights[7],
    letterSpacing: tokens.letterSpacings.hero
  },
  "text.hero.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  "text.h1.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },

  "text.h2.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },

  "text.h3.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },

  "text.h4.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },

  "text.h5.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },

  "text.h6.bold": {
    fontWeight: tokens.fontWeights.semiBold
  },
  "text.subtitle1": {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: tokens.fontSizes[4],
    lineHeight: tokens.lineHeights[4],
    letterSpacing: tokens.letterSpacings.body
  },
  "text.subtitle1.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  "text.subtitle2": {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: tokens.fontSizes[2],
    lineHeight: tokens.lineHeights[3],
    letterSpacing: tokens.letterSpacings.body
  },
  "text.subtitle2.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  "text.body1": {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: tokens.fontSizes[1],
    lineHeight: tokens.lineHeights[2],
    letterSpacing: tokens.letterSpacings.body
  },
  "text.body1.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  "text.body2": {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: tokens.fontSizes[0],
    lineHeight: tokens.lineHeights[0],
    letterSpacing: tokens.letterSpacings.body
  },
  "text.body2.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  "text.legal": {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    fontSize: tokens.fontSizes[0],
    lineHeight: tokens.lineHeights[2],
    letterSpacing: tokens.letterSpacings.body
  },
  "text.legal.bold": {
    fontWeight: tokens.fontWeights.medium
  },
  "text.overline": {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.bold,
    fontSize: tokens.fontSizes[0],
    lineHeight: tokens.lineHeights[0],
    letterSpacing: tokens.letterSpacings.overline,
    textTransform: "uppercase"
  },
  "text.overline.bold": {
    fontWeight: tokens.fontWeights.bold
  },
  // size
  "text.size1": {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: tokens.fontSizes[7],
    lineHeight: tokens.lineHeights[6],
    letterSpacing: tokens.letterSpacings.h1
  },
  "text.size2": {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: tokens.fontSizes[6],
    lineHeight: tokens.lineHeights[5],
    letterSpacing: tokens.letterSpacings.h2
  },
  "text.size3": {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: tokens.fontSizes[5],
    lineHeight: tokens.lineHeights[4],
    letterSpacing: tokens.letterSpacings.h3
  },
  "text.size4": {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: tokens.fontSizes[4],
    lineHeight: tokens.lineHeights[3],
    letterSpacing: tokens.letterSpacings.h4
  },
  "text.size5": {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: tokens.fontSizes[3],
    lineHeight: tokens.lineHeights[2],
    letterSpacing: tokens.letterSpacings.h5
  },
  "text.size6": {
    fontFamily: tokens.fonts.heading,
    fontWeight: tokens.fontWeights.semiBold,
    fontSize: tokens.fontSizes[1],
    lineHeight: tokens.lineHeights[1],
    letterSpacing: tokens.letterSpacings.h6
  },
  // colors
  "text.black": {
    color: tokens.colors.black
  },
  "text.white": {
    color: tokens.colors.white
  },
  "text.grey.t75": {
    color: tokens.colors.grey.t75
  },
  "text.primary.blue.t100": {
    color: tokens.colors.primary.blue.t100
  },
  "text.highlight.blue.t100": {
    color: tokens.colors.highlight.blue.t100
  },
  "text.conditional.positive.text": {
    color: tokens.colors.conditional.positive.text
  },
  "text.conditional.negative.text": {
    color: tokens.colors.conditional.negative.text
  },
  // ellipsis
  "text.noWrap": {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis"
  }
};
