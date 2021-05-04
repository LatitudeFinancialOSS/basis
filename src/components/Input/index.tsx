import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithProperties } from "../../types";
import { ComponentName } from "../componentName";
import { default as InputInternal } from "./Input";
import { default as InputDeprecated } from "./Input_deprecated";
import {
  InputProps,
  setDeprecatedProps as shouldUseDeprecatedInput,
} from "./types";

const { TYPES, VARIANTS, COLORS, DEFAULT_PROPS } = InputDeprecated;

const Input = forwardRef(function InputComponent(props: InputProps, ref) {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedInput(props, isDeprecatedForm)) {
    return <InputDeprecated {...props} />;
  }

  return <InputInternal {...props} innerRef={ref} />;
}) as ComponentWithProperties<InputProps>;

Input.displayName = ComponentName.Input;

Input.TYPES = TYPES;
Input.VARIANTS = VARIANTS;
Input.COLORS = COLORS;
Input.DEFAULT_PROPS = DEFAULT_PROPS;

export default Input;
