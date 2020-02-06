import { designTokens as tokens } from "basis";

export default _theme => ({
  input: {
    boxSizing: "border-box",
    fontSize: tokens.fontSizes[0],
    fontWeight: tokens.fontWeights.light,
    lineHeight: tokens.lineHeights[1],
    fontFamily: tokens.fonts.body,
    padding: `0 ${tokens.space[2]}`,
    width: "100%",
    height: tokens.space[8],
    margin: 0,
    borderRadius: tokens.radii[1],
    borderWidth: tokens.borderWidths[0],
    borderStyle: "solid",
    MozAppearance: "textfield", // Hides the input="number" spin buttons in Firefox
    transition: "color 100ms ease, border-color 100ms ease"
  },
  "input:focus": {
    outline: 0,
    color: tokens.colors.black,
    borderColor: tokens.colors.black
  },
  "input:hover": {
    color: tokens.colors.black,
    borderColor: tokens.colors.black
  },
  "input.webkitSpinButton": {
    display: "none" // Hides the input="number" spin buttons in Chrome
  },
  "input.default": {
    color: tokens.colors.grey.t65,
    backgroundColor: "transparent",
    borderColor: tokens.colors.grey.t30
  }
});
