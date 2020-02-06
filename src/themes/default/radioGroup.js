import tokens from "./tokens";

export default theme => ({
  radioGroupRadio: {
    display: "flex",
    flexDirection: "column"
  },
  radioGroupRadioLabel: {
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: theme.space[4],
    paddingRight: theme.space[4],
    height: theme.sizes[11],
    fontSize: theme.fontSizes[1],
    fontWeight: tokens.fontWeights.light,
    lineHeight: tokens.lineHeights[2],
    fontFamily: tokens.fonts.body,
    color: theme.colors.black,
    overflow: "hidden"
  },
  "radioGroupRadioLabel.focus-visible": {
    boxShadow: theme.shadows.focus,
    borderRadius: tokens.radii[0]
  },
  "radioGroupRadioLabel.checked": {
    backgroundColor: theme.colors.secondary.lightBlue.t30,
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
    width: theme.sizes[6],
    height: theme.sizes[6],
    marginRight: theme.space[3]
  },
  "radioGroupRadioOuterCircle.white": {
    fill: theme.colors.white
  },
  "radioGroupRadioOuterCircle.secondary.lightBlue.t30": {
    fill: theme.colors.secondary.lightBlue.t30
  },
  radioGroupRadioInnerCircle: {
    fill: theme.colors.primary.blue.t100
  }
});
