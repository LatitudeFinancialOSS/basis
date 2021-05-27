import React from "react";

type CheckboxColor = "grey.t05" | "white";

export interface DeprecatedCheckboxProps {
  name: string;
  label: string;
  hideLabel?: boolean;
  color?: CheckboxColor;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  validateData?: any;
  onChange?: (args: any) => void;
  children: React.ReactNode;
  testId?: string;
  __internal__keyboardFocus?: boolean;
}

export interface InternalCheckboxProps {
  label: string;
  hideLabel?: boolean;
  color?: CheckboxColor;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  value?: boolean;
  error?: string | string[];
  innerRef?: React.Ref<HTMLInputElement>;
  onChange?: (isChecked: boolean) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  children: React.ReactNode;
  testId?: string;
  __internal__keyboardFocus?: boolean;
}

export type CheckboxProps = InternalCheckboxProps | DeprecatedCheckboxProps;

export const setDeprecatedProps = (
  props: CheckboxProps,
  isDeprecated: boolean
): props is DeprecatedCheckboxProps => {
  return isDeprecated;
};
