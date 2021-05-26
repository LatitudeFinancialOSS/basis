import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { defaultFrequencyProps } from "./defaultFrequencyProps";
import { default as FrequencyInternal } from "./Frequency";
import { default as FrequencyDeprecated } from "./Frequency__deprecated";
import {
  FrequencyProps,
  setDeprecatedProps as shouldUseDeprecatedInput,
} from "./types";

const { COLORS, DEFAULT_PROPS } = FrequencyDeprecated;

interface StaticProperties {
  displayName: string;
  TYPES: string[];
  VARIANTS: string[];
  COLORS: string[];
  DEFAULT_PROPS: typeof FrequencyDeprecated.DEFAULT_PROPS;
}

// can't be an arrow function due to: https://github.com/yannickcr/eslint-plugin-react/issues/2269
const Frequency = forwardRef(function InputComponent(
  props: FrequencyProps,
  ref
) {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedInput(props, isDeprecatedForm)) {
    return <FrequencyDeprecated {...props} />;
  }

  return <FrequencyInternal {...props} innerRef={ref} />;
}) as ComponentWithStaticProperties<FrequencyProps, StaticProperties>;

Frequency.displayName = ComponentNames.Frequency;

Frequency.defaultProps = defaultFrequencyProps;

Frequency.COLORS = COLORS;
Frequency.DEFAULT_PROPS = DEFAULT_PROPS;

export default Frequency;
