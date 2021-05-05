import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentName } from "../componentNames";
import { default as InputInternal } from "./Input";
import { default as InputDeprecated } from "./Input_deprecated";
import {
  InputProps,
  setDeprecatedProps as shouldUseDeprecatedInput,
} from "./types";

const { TYPES, VARIANTS, COLORS, DEFAULT_PROPS } = InputDeprecated;

interface StaticProperties {
  displayName: string;
  TYPES: string[];
  VARIANTS: string[];
  COLORS: string[];
  DEFAULT_PROPS: typeof InputDeprecated.DEFAULT_PROPS;
}

// can't be an arrow function due to: https://github.com/yannickcr/eslint-plugin-react/issues/2269
const Input = forwardRef(function InputComponent(props: InputProps, ref) {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedInput(props, isDeprecatedForm)) {
    return <InputDeprecated {...props} />;
  }

  return <InputInternal {...props} innerRef={ref} />;
}) as ComponentWithStaticProperties<InputProps, StaticProperties>;

Input.displayName = ComponentName.Input;

Input.TYPES = TYPES;
Input.VARIANTS = VARIANTS;
Input.COLORS = COLORS;
Input.DEFAULT_PROPS = DEFAULT_PROPS;

export default Input;
