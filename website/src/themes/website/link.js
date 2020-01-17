import { designTokens as tokens } from "basis";

export default {
  link: {
    display: "inline-block",
    fontFamily: "inherit",
    fontWeight: "inherit",
    textDecoration: "none"
  },
  "link:focus": {
    outline: 0
  },
  "link:focus-visible": {
    borderRadius: tokens.radii[0],
    boxShadow: tokens.shadows.focus
  },
  "link.default": {
    color: "inherit",
    borderBottomColor: "inherit"
  },
  "link.default:hover": {
    color: "inherit",
    borderBottomColor: "inherit"
  },
  "link.default:active": {
    color: "inherit",
    borderBottomColor: "inherit"
  }
};
