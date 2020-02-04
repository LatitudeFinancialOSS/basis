import tokens from "../tokens";
import { rgba } from "polished";

export default {
  link: {
    textDecoration: "none"
  },
  "link:focus": {
    outline: 0
  },
  "link:focus-visible": {
    borderRadius: tokens.radii[0],
    boxShadow: tokens.shadows.focus
  },
  "link.text": {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    borderBottomWidth: tokens.borderWidths[0],
    borderBottomStyle: "solid",
    transition: tokens.transitions.link
  },
  "link.icon": {
    display: "flex"
  },
  "link.text.default": {
    color: tokens.colors.primary.blue.t100,
    borderBottomColor: rgba(tokens.colors.primary.blue.t100, 0.5)
  },
  "link.text.default:hover": {
    borderBottomColor: tokens.colors.primary.blue.t100,
    backgroundColor: rgba(tokens.colors.primary.blue.t100, 0.2)
  },
  "link.text.default:active": {
    borderBottomColor: tokens.colors.primary.blue.t100,
    backgroundColor: rgba(tokens.colors.primary.blue.t100, 0.2)
  },
  "link.text.secondary.turquoise.t60": {
    color: tokens.colors.secondary.turquoise.t60,
    borderBottomColor: rgba(tokens.colors.secondary.turquoise.t60, 0.5)
  },
  "link.text.secondary.turquoise.t60:hover": {
    borderBottomColor: tokens.colors.secondary.turquoise.t60,
    backgroundColor: rgba(tokens.colors.secondary.turquoise.t60, 0.2)
  },
  "link.text.secondary.turquoise.t60:active": {
    borderBottomColor: tokens.colors.secondary.turquoise.t60,
    backgroundColor: rgba(tokens.colors.secondary.turquoise.t60, 0.2)
  },
  "link.text.secondary.lightBlue.t100": {
    color: tokens.colors.secondary.lightBlue.t100,
    borderBottomColor: rgba(tokens.colors.secondary.lightBlue.t100, 0.5)
  },
  "link.text.secondary.lightBlue.t100:hover": {
    borderBottomColor: tokens.colors.secondary.lightBlue.t100,
    backgroundColor: rgba(tokens.colors.secondary.lightBlue.t100, 0.4)
  },
  "link.text.secondary.lightBlue.t100:active": {
    borderBottomColor: tokens.colors.secondary.lightBlue.t100,
    backgroundColor: rgba(tokens.colors.secondary.lightBlue.t100, 0.4)
  }
};
