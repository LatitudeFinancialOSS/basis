import React from "react";
import { RadioGroupColor } from "../internal/InternalRadioGroup";

type Option = {
  label: string | React.ReactNode;
  description?: React.ReactNode;
  value: string;
};

export type RadioOption = Option | Readonly<Option>;

export type RadioOptions = RadioOption[];

export interface DeprecatedRadioGroupProps {
  name: string;
  label: string;
  options: RadioOptions;
  columns?: number;
  color?: RadioGroupColor;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  validateData?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  testId?: string;
}

export interface InternalRadioGroupProps {
  label: string;
  options: RadioOptions;
  columns?: number;
  color?: RadioGroupColor;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((...args: any[]) => void);
  innerRef?: React.Ref<HTMLInputElement>;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  value?: string;
  testId?: string;
  error?: string | string[];
}

export type RadioGroupProps =
  | InternalRadioGroupProps
  | DeprecatedRadioGroupProps;

export const setDeprecatedProps = (
  props: RadioGroupProps,
  isDeprecated: boolean
): props is DeprecatedRadioGroupProps => {
  return isDeprecated;
};
