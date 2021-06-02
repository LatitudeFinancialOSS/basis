import React from "react";

type StringOption = {
  key: string;
  label: string;
};

type NodeOption = {
  key: string;
  label: React.ReactNode;
};

export type CheckboxOption =
  | StringOption
  | NodeOption
  | Readonly<StringOption>
  | Readonly<NodeOption>;

export type CheckboxOptions =
  | StringOption[]
  | NodeOption[]
  | Readonly<StringOption[]>
  | Readonly<NodeOption[]>;

type CheckboxColor = "grey.t05" | "white";

export type DeprecatedCheckboxGroupProps = {
  name: string;
  label: string;
  options: CheckboxOptions;
  color?: CheckboxColor;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  validateData?: any;
  onChange?: (val: any) => void;
  testId?: string;
};

export type InternalCheckboxGroupProps = {
  name: string;
  label: string;
  options: CheckboxOptions;
  value?: Record<string, boolean>;
  color?: CheckboxColor;
  helpText?: string;
  disabled?: boolean;
  optional?: boolean;
  innerRef?: React.Ref<HTMLDivElement>;
  error?: Record<string, string>;
  onChange?: (val: any) => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  testId?: string;
};

export type CheckboxGroupProps =
  | InternalCheckboxGroupProps
  | DeprecatedCheckboxGroupProps;

export const setDeprecatedProps = (
  props: CheckboxGroupProps,
  isDeprecated: boolean
): props is DeprecatedCheckboxGroupProps => {
  return isDeprecated;
};
