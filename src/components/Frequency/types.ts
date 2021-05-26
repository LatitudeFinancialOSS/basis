import React from "react";
import { InternalInputColors } from "../internal/InternalInput";
import { FrequencyError, FrequencyValue } from "../../values";

type FrequencyMode = "radio-group" | "select";

export interface DeprecatedFrequencyProps {
  name: string;
  label: string;
  color?: InternalInputColors;
  mode?: FrequencyMode;
  annually?: boolean;
  quarterly?: boolean;
  monthly?: boolean;
  fortnightly?: boolean;
  weekly?: boolean;
  amountPrefix?: string;
  amountPlaceholder?: string;
  amountMaxLength?: string | number;
  selectPlaceholder?: string;
  helpText?: React.ReactNode;
  disabled?: boolean;
  optional?: boolean;
  validate?: boolean | ((value: any, data: any) => string | string[] | null);
  validateData?: any;
  testId?: string;
}

export interface InternalFrequencyProps {
  label: string;
  value?: FrequencyValue;
  innerRef?: React.Ref<HTMLDivElement>;
  error?: FrequencyError;
  color?: InternalInputColors;
  mode?: FrequencyMode;
  annually?: boolean;
  quarterly?: boolean;
  monthly?: boolean;
  fortnightly?: boolean;
  weekly?: boolean;
  amountPrefix?: string;
  amountPlaceholder?: string;
  amountMaxLength?: string | number;
  selectPlaceholder?: string;
  helpText?: React.ReactNode;
  disabled?: boolean;
  optional?: boolean;
  testId?: string;
  onChange?: (value: FrequencyValue) => void;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  onBlur?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement | HTMLSelectElement>;
}

export type FrequencyProps = InternalFrequencyProps | DeprecatedFrequencyProps;

export const setDeprecatedProps = (
  props: FrequencyProps,
  isDeprecated: boolean
): props is DeprecatedFrequencyProps => {
  return isDeprecated;
};
