export default (theme) => ({
  button: {
    fontSize: theme.fontSizes[2],
    lineHeight: theme.lineHeights[3],
    fontFamily: theme.fonts.body,
    fontWeight: theme.fontWeights.medium,
    border: 0,
    padding: `0 ${theme.space[6]}`,
    minHeight: "48px",
    overflow: "hidden",
    transition: theme.transitions.button,
    borderRadius: theme.radii[1],
    ...theme.focusStyles.focusVisible,
    "a &": {
      cursor: "pointer",
    },
  },
  "button:disabled": {
    backgroundColor: theme.colors.grey.t30,
    color: theme.colors.grey.t75,
    opacity: 0.7,
    cursor: "not-allowed",
  },
  // Primary blue
  "button.primary.default": {
    backgroundColor: theme.colors.highlight.blue.t100,
    color: theme.colors.white,
  },
  "button.primary.default:hover": {
    backgroundColor: theme.colors.primary.blue.t100,
    color: theme.colors.white,
  },
  "button.primary.default:active": {
    backgroundColor: theme.colors.primary.blue.t100,
    color: theme.colors.white,
  },
  // Primary white
  "button.primary.white": {
    backgroundColor: theme.colors.white,
    color: theme.colors.highlight.blue.t100,
  },
  "button.primary.white:hover": {
    backgroundColor: theme.colors.secondary.lightBlue.t25,
    color: theme.colors.primary.blue.t100,
  },
  "button.primary.white:active": {
    backgroundColor: theme.colors.secondary.lightBlue.t25,
    color: theme.colors.primary.blue.t100,
  },
  // Primary green
  "button.primary.green": {
    backgroundColor: "#21a637",
    color: theme.colors.white,
  },
  "button.primary.green:hover": {
    backgroundColor: "#007414",
    color: theme.colors.white,
  },
  "button.primary.green:active": {
    backgroundColor: "#007414",
    color: theme.colors.white,
  },
  // Secondary default
  "button.secondary.default": {
    backgroundColor: "transparent",
    color: theme.colors.highlight.blue.t100,
    borderWidth: theme.borderWidths[0],
    borderStyle: "solid",
    borderColor: theme.colors.highlight.blue.t100,
  },
  "button.secondary.default:hover": {
    backgroundColor: theme.colors.highlight.blue.t100,
    color: theme.colors.white,
  },
  "button.secondary.default:active": {
    backgroundColor: theme.colors.highlight.blue.t100,
    color: theme.colors.white,
  },
  "button.secondary.default:disabled": {
    borderColor: theme.colors.grey.t65,
  },
  // Secondary white
  "button.secondary.white": {
    backgroundColor: "transparent",
    color: theme.colors.white,
    borderWidth: theme.borderWidths[0],
    borderStyle: "solid",
    borderColor: theme.colors.white,
  },
  "button.secondary.white:hover": {
    backgroundColor: theme.colors.white,
    color: theme.colors.highlight.blue.t100,
  },
  "button.secondary.white:active": {
    backgroundColor: theme.colors.white,
    color: theme.colors.highlight.blue.t100,
  },
  "button.secondary.white:disabled": {
    backgroundColor: theme.colors.grey.t30,
  },
  // Icon default
  "button.icon.default": {
    display: "flex",
    alignItems: "center",
    padding: `0 ${theme.space[2]}`,
    backgroundColor: "transparent",
  },
  "button.icon.default:hover": {
    backgroundColor: theme.colors.grey.t10,
  },
  "button.icon.default:active": {
    backgroundColor: theme.colors.grey.t10,
  },
  // Icon white
  "button.icon.white": {
    display: "flex",
    alignItems: "center",
    padding: `0 ${theme.space[2]}`,
    backgroundColor: "transparent",
  },
  "button.icon.white:hover": {
    backgroundColor: theme.colors.grey.t10,
  },
  "button.icon.white:active": {
    backgroundColor: theme.colors.grey.t10,
  },
});
