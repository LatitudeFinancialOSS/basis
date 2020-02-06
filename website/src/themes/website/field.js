import { designTokens as tokens } from "basis";

export default theme => ({
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
    fontSize: theme.fontSizes[0],
    fontWeight: tokens.fontWeights.medium,
    lineHeight: tokens.lineHeights[1],
    color: theme.colors.grey.t65,
    marginBottom: theme.space[1]
  },
  "field.helpText": {
    padding: `${theme.space[1]} ${theme.space[1]} 0`
  }
});
