import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { default as DateInputInternal } from "./DateInput";
import { default as DateInputDeprecated } from "./DateInput_deprecated";
import { defaultDateInputProps } from "./defaultDateInputProps";
import {
  DateInputProps,
  setDeprecatedProps as shouldUseDeprecatedDateInput,
} from "./types";

const { COLORS, DEFAULT_PROPS, DAY_MODES, YEAR_MODES } = DateInputInternal;

interface StaticProperties {
  YEAR_MODES: typeof DateInputInternal.YEAR_MODES;
  DAY_MODES: typeof DateInputInternal.DAY_MODES;
  COLORS: typeof DateInputInternal.COLORS;
  DEFAULT_PROPS: typeof DateInputInternal.DEFAULT_PROPS;
}
const DateInputComponent = (
  props: DateInputProps,
  ref: React.Ref<HTMLDivElement>
) => {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedDateInput(props, isDeprecatedForm)) {
    return <DateInputDeprecated {...props} />;
  }

  return <DateInputInternal {...props} innerRef={ref} />;
};
// can't be an arrow function due to: https://github.com/yannickcr/eslint-plugin-react/issues/2269
const DateInput = forwardRef(
  DateInputComponent
) as ComponentWithStaticProperties<DateInputProps, StaticProperties>;

DateInput.displayName = ComponentNames.DateInput;

DateInput.defaultProps = defaultDateInputProps;

DateInput.YEAR_MODES = YEAR_MODES;
DateInput.DAY_MODES = DAY_MODES;
DateInput.COLORS = COLORS;
DateInput.DEFAULT_PROPS = DEFAULT_PROPS;

export default DateInput;
