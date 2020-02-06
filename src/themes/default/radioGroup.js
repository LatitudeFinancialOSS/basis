import tokens from "./tokens";

export default {
  radioGroupRadio: {
    display: "flex",
    flexDirection: "column"
  },
  radioGroupRadioLabel: {
    display: "inline-flex",
    alignItems: "center",
    paddingLeft: tokens.space[4],
    paddingRight: tokens.space[4],
    height: tokens.sizes[11],
    fontSize: tokens.fontSizes[1],
    fontWeight: tokens.fontWeights.light,
    lineHeight: tokens.lineHeights[2],
    fontFamily: tokens.fonts.body,
    color: tokens.colors.black,
    overflow: "hidden"
  },
  "radioGroupRadioLabel.focus-visible": {
    boxShadow: tokens.shadows.focus,
    borderRadius: tokens.radii[0]
  },
  "radioGroupRadioLabel.checked": {
    backgroundColor: tokens.colors.secondary.lightBlue.t30,
    color: tokens.colors.primary.blue.t100
  },
  "radioGroupRadioLabel.grey.t05": {
    backgroundColor: tokens.colors.grey.t05
  },
  "radioGroupRadioLabel.white": {
    backgroundColor: tokens.colors.white
  },
  "radioGroupRadioLabel.oneLine.withoutCircle": {
    justifyContent: "center"
  },
  radioGroupRadioCircle: {
    flexShrink: 0,
    width: tokens.sizes[6],
    height: tokens.sizes[6],
    marginRight: tokens.space[3]
  },
  "radioGroupRadioOuterCircle.white": {
    fill: tokens.colors.white
  },
  "radioGroupRadioOuterCircle.secondary.lightBlue.t30": {
    fill: tokens.colors.secondary.lightBlue.t30
  },
  radioGroupRadioInnerCircle: {
    fill: tokens.colors.primary.blue.t100
  }
};
