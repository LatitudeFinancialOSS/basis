import tokens from "./tokens";

export default theme => ({
  checkboxLabelContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  checkboxLabel: {
    display: "inline-flex",
    alignItems: "flex-start",
    padding: `${tokens.space[3]} ${tokens.space[4]}`,
    minHeight: tokens.sizes[6],
    fontSize: tokens.fontSizes[1],
    fontWeight: tokens.fontWeights.light,
    lineHeight: tokens.lineHeights[2],
    fontFamily: tokens.fonts.body,
    color: theme.colors.black
  },
  "checkboxLabel.focus-visible": {
    boxShadow: theme.shadows.focus,
    borderRadius: tokens.radii[0]
  },
  "checkboxLabel.checked": {
    backgroundColor: theme.colors.secondary.lightBlue.t30,
    color: theme.colors.primary.blue.t100
  },
  "checkboxLabel.grey.t05": {
    backgroundColor: theme.colors.grey.t05
  },
  "checkboxLabel.white": {
    backgroundColor: theme.colors.white
  },
  checkboxIcon: {
    flexShrink: 0,
    width: tokens.sizes[6],
    height: tokens.sizes[6],
    marginRight: tokens.space[3]
  },
  "checkboxIcon.secondary.lightBlue.t30": {
    fill: theme.colors.secondary.lightBlue.t30
  },
  "checkboxIcon.white": {
    fill: theme.colors.white
  },
  checkboxIconMark: {
    stroke: theme.colors.primary.blue.t100
  }
});
