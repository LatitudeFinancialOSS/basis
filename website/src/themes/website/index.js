import { defaultTheme } from "basis";
import button from "./button";
import field from "./field";
import input from "./input";
import select from "./select";

const websiteTheme = {
  ...defaultTheme,
  ...button,
  ...field,
  ...input,
  ...select
};

export default websiteTheme;
