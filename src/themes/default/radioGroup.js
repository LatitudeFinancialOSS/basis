export default theme => ({
  radioGroupRadio: {
    display: "flex",
    flexDirection: "column"
  },
  radioGroupRadioInput: {
    ...theme.focusStyles.focusVisibleAdjacentLabel
  },
  radioGroupRadioLabel: {
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: theme.space[4],
    paddingRight: theme.space[4],
    height: "48px",
    fontSize: theme.fontSizes[1],
    fontWeight: theme.fontWeights.light,
    lineHeight: theme.lineHeights[2],
    fontFamily: theme.fonts.body,
    color: theme.colors.black,
    overflow: "hidden",
    borderRadius: theme.radii[0]
  },
  "radioGroupRadioLabel.checked": {
    backgroundColor: theme.colors.secondary.lightBlue.t25,
    color: theme.colors.primary.blue.t100
  },
  "radioGroupRadioLabel.grey.t05": {
    backgroundColor: theme.colors.grey.t05
  },
  "radioGroupRadioLabel.white": {
    backgroundColor: theme.colors.white
  },
  "radioGroupRadioLabel.oneLine.withoutCircle": {
    justifyContent: "center"
  },
  radioGroupRadioCircle: {
    flexShrink: 0,
    width: "24px",
    height: "24px",
    marginRight: theme.space[3]
  },
  "radioGroupRadioOuterCircle.white": {
    fill: theme.colors.white
  },
  "radioGroupRadioOuterCircle.secondary.lightBlue.t25": {
    fill: theme.colors.secondary.lightBlue.t25
  },
  radioGroupRadioInnerCircle: {
    fill: theme.colors.primary.blue.t100
  }
});
