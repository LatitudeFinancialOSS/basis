export default theme => ({
  link: {
    display: "inline-block",
    textDecoration: "none",
    borderRadius: theme.radii[0],
    ...theme.focusStyles.focusVisible
  },
  "link.text": {
    fontFamily: "inherit",
    fontWeight: "inherit"
  },
  "link.text.default": {
    color: "inherit",
    borderBottomColor: "inherit"
  },
  "link.text.default:hover": {
    color: "inherit",
    borderBottomColor: "inherit"
  },
  "link.text.default:active": {
    color: "inherit",
    borderBottomColor: "inherit"
  }
});
