import React from "react";
import { ResponsiveProp, SizeValue } from "../../types";

export type TextareaColors = "grey.t05" | "white";

export type DeprecatedTextareaProps = {
  name: string;
  maxLength?: string | number;
  color?: TextareaColors;
  label: string;
  placeholder?: string;
  helpText?: React.ReactNode;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  validateData: any;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  testId?: string;
  __internal__focus?: boolean;
} & ResponsiveProp<"height", SizeValue>;

export type InternalTextareaProps = {
  label: string;
  innerRef?: React.Ref<HTMLTextAreaElement>;
  value?: string;
  error?: string | string[];
  maxLength?: string | number;
  color?: TextareaColors;
  placeholder?: string;
  helpText?: React.ReactNode;
  disabled?: boolean;
  optional?: boolean;
  testId?: string;
  onChange?: React.ChangeEventHandler<HTMLTextAreaElement>;
  onFocus?: React.FocusEventHandler<HTMLTextAreaElement>;
  onBlur?: React.FocusEventHandler<HTMLTextAreaElement>;
  __internal__focus?: boolean;
} & ResponsiveProp<"height", SizeValue>;

export type TextareaProps = InternalTextareaProps | DeprecatedTextareaProps;

export const setDeprecatedProps = (
  props: TextareaProps,
  isDeprecated: boolean
): props is DeprecatedTextareaProps => {
  return isDeprecated;
};
