import React from "react";
import { SelectColors, SelectOptions } from "../internal/InternalSelect";

export interface DeprecatedSelectProps {
  name: string;
  label: string;
  color?: SelectColors;
  placeholder?: string;
  options: SelectOptions;
  fullWidth?: boolean;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  validateData?: any;
  // has to be any because otherwise the onChanges of Deprecated and Internal will be incompatible
  // this will result in a conflicting inference from <Field /> component
  onChange?: (selectedOption: any) => void;
  testId?: string;
  __internal__focus?: boolean;
}

export interface InternalSelectProps {
  label: string;
  value?: string;
  innerRef?: React.Ref<HTMLSelectElement>;
  color?: SelectColors;
  error?: string | string[];
  placeholder?: string;
  options: SelectOptions;
  fullWidth?: boolean;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
  onBlur?: React.FocusEventHandler<HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLSelectElement>;
  testId?: string;
  __internal__focus?: boolean;
}

export type SelectProps = InternalSelectProps | DeprecatedSelectProps;

export const setDeprecatedProps = (
  props: SelectProps,
  isDeprecated: boolean
): props is DeprecatedSelectProps => {
  return isDeprecated;
};
