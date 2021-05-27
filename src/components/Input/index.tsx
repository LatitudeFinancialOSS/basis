import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { defaultInputProps } from "./defaultInputProps";
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
const InputComponent = (
  props: InputProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedInput(props, isDeprecatedForm)) {
    return <InputDeprecated {...props} />;
  }

  return <InputInternal {...props} innerRef={ref} />;
};

const Input = forwardRef(InputComponent) as ComponentWithStaticProperties<
  InputProps,
  StaticProperties
>;

Input.displayName = ComponentNames.Input;

Input.defaultProps = defaultInputProps;

Input.TYPES = TYPES;
Input.VARIANTS = VARIANTS;
Input.COLORS = COLORS;
Input.DEFAULT_PROPS = DEFAULT_PROPS;

export default Input;
