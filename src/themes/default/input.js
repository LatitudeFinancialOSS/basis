import tokens from "./tokens";

export default theme => ({
  input: {
    boxSizing: "border-box",
    fontSize: tokens.fontSizes[1],
    fontWeight: tokens.fontWeights.light,
    lineHeight: tokens.lineHeights[2],
    fontFamily: tokens.fonts.body,
    padding: `0 ${theme.space[4]}`,
    color: theme.colors.black,
    width: "100%",
    height: theme.space[11],
    border: 0,
    margin: 0,
    MozAppearance: "textfield" // Hides the input="number" spin buttons in Firefox
  },
  "input:focus": {
    outline: 0,
    borderRadius: tokens.radii[0],
    boxShadow: theme.shadows.focus
  },
  "input.webkitSpinButton": {
    display: "none" // Hides the input="number" spin buttons in Chrome
  },
  "input.default": {
    backgroundColor: theme.colors.grey.t05
  },
  "input.white": {
    backgroundColor: theme.colors.white
  }
});
