import tokens from "./tokens";

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
    fontSize: tokens.fontSizes[1],
    fontWeight: tokens.fontWeights.medium,
    lineHeight: tokens.lineHeights[2],
    color: theme.colors.grey.t75,
    marginBottom: theme.space[2]
  },
  "field.label.optional": {
    alignSelf: "flex-end",
    fontSize: tokens.fontSizes[0],
    lineHeight: tokens.lineHeights[0],
    paddingLeft: theme.space[2],
    paddingRight: theme.space[2],
    border: `${tokens.borderWidths[1]} solid ${theme.colors.grey.t75}`,
    borderRadius: tokens.radii[2],
    opacity: 0.66,
    marginLeft: "auto"
  },
  "field.helpText": {
    paddingTop: theme.space[2]
  },
  "field.errors": {
    paddingTop: theme.space[1],
    borderTop: `${tokens.borderWidths[2]} solid ${theme.colors.conditional.negative.graphics}`,
    zIndex: 1
  }
});
