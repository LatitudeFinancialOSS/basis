import React from "react";
import {
  InternalInputColors,
  InternalInputTypes,
  InternalInputVariants,
} from "../internal/InternalInput";

export interface DeprecatedInputProps {
  name: string;
  label: string;
  id?: string;
  type?: InternalInputTypes;
  placeholder?: string;
  variant?: InternalInputVariants;
  prefix?: string;
  suffix?: string;
  maxLength?: string | number;
  autoComplete?: string;
  optional?: boolean;
  color?: InternalInputColors;
  helpText?: React.ReactNode;
  disabled?: boolean;
  pasteAllowed?: boolean;
  isValid?: boolean;
  testId?: string;
  describedBy?: string;
  validateData?: any;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  __internal__focus?: boolean;
}

export interface InternalInputProps {
  label: string;
  parentName?: string;
  id?: string;
  type?: InternalInputTypes;
  innerRef?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  variant?: InternalInputVariants;
  prefix?: string;
  suffix?: string;
  maxLength?: string | number;
  autoComplete?: string;
  optional?: boolean;
  color?: InternalInputColors;
  helpText?: React.ReactNode;
  disabled?: boolean;
  pasteAllowed?: boolean;
  isValid?: boolean;
  testId?: string;
  describedBy?: string;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  error?: string | string[];
  __internal__focus?: boolean;
}

export type InputProps = InternalInputProps | DeprecatedInputProps;

export const setDeprecatedProps = (
  props: InputProps,
  isDeprecated: boolean
): props is DeprecatedInputProps => {
  return isDeprecated;
};
