export default theme => ({
  button: {
    fontSize: theme.fontSizes[0],
    lineHeight: theme.lineHeights[0],
    fontFamily: theme.fonts.body,
    fontWeight: theme.fontWeights.medium,
    borderRadius: theme.radii[1],
    padding: `0 ${theme.space[4]}`,
    minHeight: "32px",
    overflow: "hidden",
    transition:
      "transform 100ms ease, color 100ms ease, border-color 100ms ease",
    ...theme.focusStyles.focusVisible
  },
  "button:disabled": {
    opacity: 0.4,
    cursor: "not-allowed"
  },
  // Secondary default
  "button.secondary.default": {
    color: theme.colors.grey.t65,
    backgroundColor: "transparent",
    borderWidth: theme.borderWidths[0],
    borderStyle: "solid",
    borderColor: theme.colors.grey.t30
  },
  "button.secondary.default:hover": {
    color: theme.colors.black,
    borderColor: theme.colors.black
  },
  "button.secondary.default:active": {
    color: theme.colors.black,
    borderColor: theme.colors.black,
    transform: "scale(0.95)"
  },
  // Icon default
  "button.icon.default": {
    display: "flex",
    padding: `0 ${theme.space[1]}`,
    color: theme.colors.grey.t65,
    backgroundColor: "transparent",
    border: 0
  },
  "button.icon.default:hover": {
    color: theme.colors.black
  }
});
