import tokens from "../tokens";

export default {
  button: {
    fontSize: tokens.fontSizes[2],
    lineHeight: tokens.lineHeights[3],
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.medium,
    border: 0,
    borderRadius: tokens.radii[1],
    padding: `0 ${tokens.space[6]}`,
    minHeight: tokens.sizes[10],
    overflow: "hidden",
    transition: tokens.transitions.button
  },
  "button.fullWidth": {
    width: "100%"
  },
  "button:focus": {
    outline: 0
  },
  "button:focus-visible": {
    boxShadow: tokens.shadows.focus
  },
  "button:disabled": {
    backgroundColor: tokens.colors.grey.t30,
    color: tokens.colors.grey.t75,
    opacity: 0.7,
    cursor: "not-allowed"
  },
  // Primary blue
  "button.primary.default": {
    backgroundColor: tokens.colors.highlight.blue.t100,
    color: tokens.colors.white
  },
  "button.primary.default:hover": {
    backgroundColor: tokens.colors.primary.blue.t100
  },
  "button.primary.default:active": {
    backgroundColor: tokens.colors.primary.blue.t100
  },
  // Primary white
  "button.primary.white": {
    backgroundColor: tokens.colors.white,
    color: tokens.colors.highlight.blue.t100
  },
  "button.primary.white:hover": {
    backgroundColor: tokens.colors.secondary.lightBlue.t30,
    color: tokens.colors.primary.blue.t100
  },
  "button.primary.white:active": {
    backgroundColor: tokens.colors.secondary.lightBlue.t30,
    color: tokens.colors.primary.blue.t100
  },
  // Secondary default
  "button.secondary.default": {
    backgroundColor: "transparent",
    color: tokens.colors.highlight.blue.t100,
    borderWidth: tokens.borderWidths[0],
    borderStyle: "solid",
    borderColor: tokens.colors.highlight.blue.t100
  },
  "button.secondary.default:hover": {
    backgroundColor: tokens.colors.highlight.blue.t100,
    color: tokens.colors.white
  },
  "button.secondary.default:active": {
    backgroundColor: tokens.colors.highlight.blue.t100,
    color: tokens.colors.white
  },
  "button.secondary.default:disabled": {
    borderColor: tokens.colors.grey.t65
  },
  // Secondary white
  "button.secondary.white": {
    backgroundColor: "transparent",
    color: tokens.colors.white,
    borderWidth: tokens.borderWidths[0],
    borderStyle: "solid",
    borderColor: tokens.colors.white
  },
  "button.secondary.white:hover": {
    backgroundColor: tokens.colors.white,
    color: tokens.colors.highlight.blue.t100
  },
  "button.secondary.white:active": {
    backgroundColor: tokens.colors.white,
    color: tokens.colors.highlight.blue.t100
  },
  "button.secondary.white:disabled": {
    backgroundColor: tokens.colors.grey.t30
  }
};
