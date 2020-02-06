import { designTokens as tokens } from "basis";

export default theme => ({
  link: {
    display: "inline-block",
    textDecoration: "none"
  },
  "link:focus": {
    outline: 0
  },
  "link:focus-visible": {
    borderRadius: tokens.radii[0],
    boxShadow: theme.shadows.focus
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
