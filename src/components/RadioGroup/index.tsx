import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { default as RadioInternal } from "./RadioGroup";
import { default as RadioDeprecated } from "./RadioGroup__deprecated";
import {
  RadioGroupProps,
  setDeprecatedProps as shouldUseDeprecatedInput,
} from "./types";

const { COLORS, DEFAULT_PROPS } = RadioDeprecated;

type StaticProperties = {
  displayName: string;
  COLORS: typeof RadioDeprecated.COLORS;
  DEFAULT_PROPS: typeof RadioDeprecated.DEFAULT_PROPS;
};

const RadioGroup = forwardRef(function RadioGroupComponent(
  props: RadioGroupProps,
  ref
) {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedInput(props, isDeprecatedForm)) {
    return <RadioDeprecated {...props} />;
  }

  return <RadioInternal {...props} innerRef={ref} />;
}) as ComponentWithStaticProperties<RadioGroupProps, StaticProperties>;

RadioGroup.displayName = ComponentNames.RadioGroup;

RadioGroup.COLORS = COLORS;
RadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

export default RadioGroup;
