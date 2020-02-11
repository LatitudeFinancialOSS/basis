export default theme => ({
  input: {
    boxSizing: "border-box",
    fontSize: theme.fontSizes[0],
    fontWeight: theme.fontWeights.light,
    lineHeight: theme.lineHeights[1],
    fontFamily: theme.fonts.body,
    padding: `0 ${theme.space[2]}`,
    width: "100%",
    height: "32px",
    margin: 0,
    borderRadius: theme.radii[1],
    borderWidth: theme.borderWidths[0],
    borderStyle: "solid",
    MozAppearance: "textfield", // Hides the input="number" spin buttons in Firefox
    transition: "color 100ms ease, border-color 100ms ease"
  },
  "input:focus": {
    outline: 0,
    color: theme.colors.black,
    borderColor: theme.colors.black
  },
  "input:hover": {
    color: theme.colors.black,
    borderColor: theme.colors.black
  },
  "input.webkitSpinButton": {
    display: "none" // Hides the input="number" spin buttons in Chrome
  },
  "input.default": {
    color: theme.colors.grey.t65,
    backgroundColor: "transparent",
    borderColor: theme.colors.grey.t30
  }
});
