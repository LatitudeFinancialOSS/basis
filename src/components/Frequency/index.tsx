import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ALL_FREQUENCY_OPTIONS } from "../../values";
import { ComponentNames } from "../componentNames";
import { defaultFrequencyProps } from "./defaultFrequencyProps";
import { default as FrequencyInternal } from "./Frequency";
import { default as FrequencyDeprecated } from "./Frequency__deprecated";
import {
  FrequencyProps,
  setDeprecatedProps as shouldUseDeprecatedFrequency,
} from "./types";

const { COLORS, DEFAULT_PROPS, MODES } = FrequencyDeprecated;

interface StaticProperties {
  COLORS: string[];
  DEFAULT_PROPS: typeof FrequencyDeprecated.DEFAULT_PROPS;
  MODES: typeof FrequencyDeprecated.MODES;
  ALL_FREQUENCY_OPTIONS: typeof ALL_FREQUENCY_OPTIONS;
}

const FrequencyComponent = (
  props: FrequencyProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedFrequency(props, isDeprecatedForm)) {
    return <FrequencyDeprecated {...props} />;
  }

  return <FrequencyInternal {...props} innerRef={ref} />;
};

const Frequency = forwardRef(
  FrequencyComponent
) as ComponentWithStaticProperties<FrequencyProps, StaticProperties>;

Frequency.displayName = ComponentNames.Frequency;

Frequency.defaultProps = defaultFrequencyProps;

Frequency.COLORS = COLORS;
Frequency.DEFAULT_PROPS = DEFAULT_PROPS;
Frequency.MODES = MODES;
Frequency.ALL_FREQUENCY_OPTIONS = ALL_FREQUENCY_OPTIONS;

export default Frequency;
