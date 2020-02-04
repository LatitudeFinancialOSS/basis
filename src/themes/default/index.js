import button from "./button";
import checkbox from "./checkbox";
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

export default {
  ...button,
  ...checkbox,
  ...field,
  ...grid,
  ...input,
  ...link,
  ...list,
  ...loadingIcon,
  ...radioGroup,
  ...select,
  ...stepper,
  ...text,
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
    link: "background-color 0.2s ease-out, border-bottom-color 0.2s ease-out",
    icon: "fill 0.2s ease-out"
  },
  zIndices: {
    header: 1000
  }
};
