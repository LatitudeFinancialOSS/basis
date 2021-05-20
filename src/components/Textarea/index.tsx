import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { defaultTextareaProps } from "./defaultTextareaProps";
import { default as TextareaInternal } from "./Textarea";
import { default as TextareaDeprecated } from "./Textarea_deprecated";
import {
  TextareaProps,
  setDeprecatedProps as shouldUseDeprecatedInput,
} from "./types";

const { COLORS, DEFAULT_PROPS } = TextareaDeprecated;

interface StaticProperties {
  displayName: string;
  TYPES: string[];
  VARIANTS: string[];
  COLORS: string[];
  DEFAULT_PROPS: typeof TextareaDeprecated.DEFAULT_PROPS;
}

// can't be an arrow function due to: https://github.com/yannickcr/eslint-plugin-react/issues/2269
const Textarea = forwardRef(function TextareaComponent(
  props: TextareaProps,
  ref
) {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedInput(props, isDeprecatedForm)) {
    return <TextareaDeprecated {...props} />;
  }

  return <TextareaInternal {...props} innerRef={ref} />;
}) as ComponentWithStaticProperties<TextareaProps, StaticProperties>;

Textarea.displayName = ComponentNames.Input;

Textarea.defaultProps = defaultTextareaProps;

Textarea.COLORS = COLORS;
Textarea.DEFAULT_PROPS = DEFAULT_PROPS;

export default Textarea;
