import { defaultSelectProps } from "../Select/defaultSelectProps";

export const defaultFrequencyProps = {
  mode: "radio-group",
  annually: true,
  quarterly: true,
  monthly: true,
  fortnightly: true,
  weekly: true,
  disabled: false,
  selectPlaceholder: defaultSelectProps.placeholder,
  optional: false,
} as const;
