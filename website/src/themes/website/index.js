import { defaultTheme } from "basis";
import button from "./button";
import field from "./field";
import input from "./input";
import link from "./link";
import select from "./select";

const websiteTheme = {
  ...defaultTheme,
  ...button,
  ...field,
  ...input,
  ...link,
  ...select
};

export default websiteTheme;
