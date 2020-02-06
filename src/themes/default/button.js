import tokens from "./tokens";

export default theme => ({
  button: {
    fontSize: tokens.fontSizes[2],
    lineHeight: tokens.lineHeights[3],
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.medium,
    border: 0,
    borderRadius: tokens.radii[1],
    padding: `0 ${tokens.space[6]}`,
    minHeight: tokens.sizes[11],
    overflow: "hidden",
    transition: theme.transitions.button
  },
  "button.fullWidth": {
    width: "100%"
  },
  "button:focus": {
    outline: 0
  },
  "button:focus-visible": {
    boxShadow: theme.shadows.focus
  },
  "button:disabled": {
    backgroundColor: theme.colors.grey.t30,
    color: theme.colors.grey.t75,
    opacity: 0.7,
    cursor: "not-allowed"
  },
  // Primary blue
  "button.primary.default": {
    backgroundColor: theme.colors.highlight.blue.t100,
    color: theme.colors.white
  },
  "button.primary.default:hover": {
    backgroundColor: theme.colors.primary.blue.t100
  },
  "button.primary.default:active": {
    backgroundColor: theme.colors.primary.blue.t100
  },
  // Primary white
  "button.primary.white": {
    backgroundColor: theme.colors.white,
    color: theme.colors.highlight.blue.t100
  },
  "button.primary.white:hover": {
    backgroundColor: theme.colors.secondary.lightBlue.t30,
    color: theme.colors.primary.blue.t100
  },
  "button.primary.white:active": {
    backgroundColor: theme.colors.secondary.lightBlue.t30,
    color: theme.colors.primary.blue.t100
  },
  // Secondary default
  "button.secondary.default": {
    backgroundColor: "transparent",
    color: theme.colors.highlight.blue.t100,
    borderWidth: tokens.borderWidths[0],
    borderStyle: "solid",
    borderColor: theme.colors.highlight.blue.t100
  },
  "button.secondary.default:hover": {
    backgroundColor: theme.colors.highlight.blue.t100,
    color: theme.colors.white
  },
  "button.secondary.default:active": {
    backgroundColor: theme.colors.highlight.blue.t100,
    color: theme.colors.white
  },
  "button.secondary.default:disabled": {
    borderColor: theme.colors.grey.t65
  },
  // Secondary white
  "button.secondary.white": {
    backgroundColor: "transparent",
    color: theme.colors.white,
    borderWidth: tokens.borderWidths[0],
    borderStyle: "solid",
    borderColor: theme.colors.white
  },
  "button.secondary.white:hover": {
    backgroundColor: theme.colors.white,
    color: theme.colors.highlight.blue.t100
  },
  "button.secondary.white:active": {
    backgroundColor: theme.colors.white,
    color: theme.colors.highlight.blue.t100
  },
  "button.secondary.white:disabled": {
    backgroundColor: theme.colors.grey.t30
  }
});
