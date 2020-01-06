import tokens from "../tokens";
import { rgba } from "polished";

export default {
  link: {
    fontFamily: tokens.fonts.body,
    fontWeight: tokens.fontWeights.light,
    textDecoration: "none",
    borderBottomWidth: tokens.borderWidths[0],
    borderBottomStyle: "solid",
    transition: tokens.transitions.link
  },
  "link:focus": {
    outline: 0,
    borderRadius: tokens.radii[0],
    boxShadow: tokens.shadows.focus
  },
  "link.highlight.blue.t100": {
    color: tokens.colors.highlight.blue.t100,
    borderBottomColor: rgba(tokens.colors.highlight.blue.t100, 0.5)
  },
  "link.highlight.blue.t100:hover": {
    borderBottomColor: tokens.colors.highlight.blue.t100,
    backgroundColor: rgba(tokens.colors.highlight.blue.t100, 0.2)
  },
  "link.highlight.blue.t100:active": {
    borderBottomColor: tokens.colors.highlight.blue.t100,
    backgroundColor: rgba(tokens.colors.highlight.blue.t100, 0.2)
  },
  "link.secondary.turquoise.t60": {
    color: tokens.colors.secondary.turquoise.t60,
    borderBottomColor: rgba(tokens.colors.secondary.turquoise.t60, 0.5)
  },
  "link.secondary.turquoise.t60:hover": {
    borderBottomColor: tokens.colors.secondary.turquoise.t60,
    backgroundColor: rgba(tokens.colors.secondary.turquoise.t60, 0.2)
  },
  "link.secondary.turquoise.t60:active": {
    borderBottomColor: tokens.colors.secondary.turquoise.t60,
    backgroundColor: rgba(tokens.colors.secondary.turquoise.t60, 0.2)
  },
  "link.secondary.lightBlue.t100": {
    color: tokens.colors.secondary.lightBlue.t100,
    borderBottomColor: rgba(tokens.colors.secondary.lightBlue.t100, 0.5)
  },
  "link.secondary.lightBlue.t100:hover": {
    borderBottomColor: tokens.colors.secondary.lightBlue.t100,
    backgroundColor: rgba(tokens.colors.secondary.lightBlue.t100, 0.4)
  },
  "link.secondary.lightBlue.t100:active": {
    borderBottomColor: tokens.colors.secondary.lightBlue.t100,
    backgroundColor: rgba(tokens.colors.secondary.lightBlue.t100, 0.4)
  }
};
