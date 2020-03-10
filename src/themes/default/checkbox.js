export default theme => ({
  checkboxLabelContainer: {
    display: "flex",
    flexDirection: "column",
    flex: 1
  },
  checkboxInput: {
    ...theme.focusStyles.focusVisibleAdjacentLabel
  },
  checkboxLabel: {
    display: "inline-flex",
    alignItems: "flex-start",
    padding: `${theme.space[3]} ${theme.space[4]}`,
    minHeight: "24px",
    fontSize: theme.fontSizes[1],
    fontWeight: theme.fontWeights.light,
    lineHeight: theme.lineHeights[2],
    fontFamily: theme.fonts.body,
    color: theme.colors.black,
    borderRadius: theme.radii[0]
  },
  "checkboxLabel.checked": {
    backgroundColor: theme.colors.secondary.lightBlue.t25,
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
    width: "24px",
    height: "24px",
    marginRight: theme.space[3]
  },
  "checkboxIcon.secondary.lightBlue.t25": {
    fill: theme.colors.secondary.lightBlue.t25
  },
  "checkboxIcon.white": {
    fill: theme.colors.white
  },
  checkboxIconMark: {
    stroke: theme.colors.primary.blue.t100
  }
});
