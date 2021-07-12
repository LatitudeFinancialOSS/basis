import React from "react";
import { RadioGroupColor } from "../internal/InternalRadioGroup";

type StringOption = {
  label: string;
  description?: React.ReactNode;
  value: string;
};

type NodeOption = {
  label: React.ReactNode;
  // explicit undefined is needed due to: https://github.com/microsoft/TypeScript/issues/12815#issuecomment-266250230
  description: undefined;
  value: string;
};

export type RadioOption =
  | StringOption
  | NodeOption
  | Readonly<StringOption>
  | Readonly<NodeOption>;

export type RadioOptions =
  | StringOption[]
  | NodeOption[]
  | Readonly<StringOption[]>
  | Readonly<NodeOption[]>;

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
  name?: string;
  options: RadioOptions;
  columns?: number;
  color?: RadioGroupColor;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
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
