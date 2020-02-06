import { designTokens as tokens } from "basis";

export default _theme => ({
  field: {
    display: "inline-flex",
    flexDirection: "column",
    position: "relative"
  },
  "field.fullWidth": {
    display: "flex",
    width: "100%",
    minWidth: 0 // See: https://stackoverflow.com/a/36247448/247243
  },
  "field.disabled": {
    opacity: 0.5
  },
  "field.label": {
    display: "flex",
    fontFamily: tokens.fonts.body,
    fontSize: tokens.fontSizes[0],
    fontWeight: tokens.fontWeights.medium,
    lineHeight: tokens.lineHeights[1],
    color: tokens.colors.grey.t65,
    marginBottom: tokens.space[1]
  },
  "field.helpText": {
    padding: `${tokens.space[1]} ${tokens.space[1]} 0`
  }
});
