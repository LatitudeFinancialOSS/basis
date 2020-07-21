import { defaultTheme as theme } from "basis";
import button from "./button";
import field from "./field";
import input from "./input";
import link from "./link";
import select from "./select";

export default {
  ...theme,
  button: button(theme),
  field: field(theme),
  input: input(theme),
  link: link(theme),
  select: select(theme),
};
