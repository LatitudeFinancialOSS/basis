import tokens from "./tokens";
import button from "./button";
import checkbox from "./checkbox";
import container from "./container";
import field from "./field";
import grid from "./grid";
import input from "./input";
import link from "./link";
import list from "./list";
import loadingIcon from "./loadingIcon";
import radioGroup from "./radioGroup";
import select from "./select";
import stepper from "./stepper";
import text from "./text";
import textStyles from "./textStyles";

const theme = {
  textStyles,
  breakpoints: {
    xs: "380px",
    sm: "576px",
    md: "768px",
    lg: "992px",
    xl: "1200px"
  },
  breakpointMaxWidths: {
    sm: "540px",
    md: "720px",
    lg: "960px",
    xl: "1140px"
  },
  transitions: {
    button: "background-color 150ms ease, color 150ms ease",
    link: "background-color 200ms ease-out, border-bottom-color 200ms ease-out",
    icon: "fill 200ms ease-out"
  },
  zIndices: {
    header: 1000
  },
  shadows: {
    header: `inset 0 ${tokens.borderWidths[1]} 0 0 rgba(0, 0, 0, .05)`,
    focus: `0 0 0px ${tokens.radii[1]} ${tokens.colors.secondary.lightBlue.t80}`
  }
};

export default {
  ...theme,
  ...button(theme),
  ...checkbox(theme),
  ...container(theme),
  ...field(theme),
  ...grid(theme),
  ...input(theme),
  ...link(theme),
  ...list(theme),
  ...loadingIcon(theme),
  ...radioGroup(theme),
  ...select(theme),
  ...stepper(theme),
  ...text(theme)
};
