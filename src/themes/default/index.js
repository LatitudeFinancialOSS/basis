import button from "./button";
import checkbox from "./checkbox";
import field from "./field";
import grid from "./grid";
import icon from "./icon";
import input from "./input";
import link from "./link";
import loadingIcon from "./loadingIcon";
import radioGroup from "./radioGroup";
import select from "./select";
import stepper from "./stepper";
import text from "./text";

export default {
  ...button,
  ...checkbox,
  ...field,
  ...grid,
  ...icon,
  ...input,
  ...link,
  ...loadingIcon,
  ...radioGroup,
  ...select,
  ...stepper,
  ...text,
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
  }
};
