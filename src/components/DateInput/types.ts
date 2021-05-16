import React from "react";
import { InternalInputColors } from "../internal/InternalInput";

export type DayMode = "none" | "2-digits";
export type YearMode = "2-digits" | "4-digits";

export interface DateValue {
  day: string;
  month: string;
  year: string;
}

export interface DeprecatedDateInputProps {
  name: string;
  color?: InternalInputColors;
  label?: string;
  dayMode?: DayMode;
  yearMode?: YearMode;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  validateData?: any;
  "aria-labelledby"?: string;
  testId?: string;
}

export type DateInputError = {
  day?: string;
  month?: string;
  year?: string;
  field?: string;
};

export interface InternalDateInputProps {
  value?: DateValue;
  innerRef?: React.Ref<HTMLDivElement>;
  color?: InternalInputColors;
  label?: string;
  dayMode?: DayMode;
  yearMode?: YearMode;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  error?: DateInputError;
  "aria-labelledby"?: string;
  testId?: string;
  onChange?: (value: DateValue) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
}

export type DateInputProps = InternalDateInputProps | DeprecatedDateInputProps;

export const setDeprecatedProps = (
  props: DateInputProps,
  isDeprecated: boolean
): props is DeprecatedDateInputProps => {
  return isDeprecated;
};
