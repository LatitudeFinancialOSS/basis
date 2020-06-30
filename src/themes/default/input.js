export default (theme) => ({
  inputContainer: {
    position: "relative",
    fontSize: theme.fontSizes[1],
    fontWeight: theme.fontWeights.light,
    lineHeight: theme.lineHeights[2],
    fontFamily: theme.fonts.body,
    color: theme.colors.black,
  },
  input: {
    boxSizing: "border-box",
    width: "100%",
    height: "48px",
    border: 0,
    margin: 0,
    paddingTop: 0,
    paddingBottom: 0,
    fontSize: "inherit",
    fontWeight: "inherit",
    lineHeight: "inherit",
    fontFamily: "inherit",
    color: "inherit",
  },
  "input:focus": {
    outline: 0,
    borderRadius: theme.radii[0],
    boxShadow: theme.shadows.focus,
  },
  "input.default": {
    backgroundColor: theme.colors.grey.t05,
  },
  "input.white": {
    backgroundColor: theme.colors.white,
  },
});
