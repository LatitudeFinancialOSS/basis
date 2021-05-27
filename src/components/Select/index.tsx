import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { defaultSelectProps } from "./defaultSelectProps";
import { default as SelectInternal } from "./Select";
import { default as SelectDeprecated } from "./Select_deprecated";
import {
  SelectProps,
  setDeprecatedProps as shouldUseDeprecatedSelect,
} from "./types";

const DEFAULT_PROPS = {
  ...defaultSelectProps,
  disabled: false,
  optional: false,
} as const;

interface StaticProperties {
  displayName: string;
  COLORS: typeof SelectDeprecated.COLORS;
  DEFAULT_PROPS: typeof DEFAULT_PROPS;
}
const SelectComponent = (
  props: SelectProps,
  ref: React.Ref<HTMLSelectElement>
) => {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedSelect(props, isDeprecatedForm)) {
    return <SelectDeprecated {...props} />;
  }

  return <SelectInternal {...props} innerRef={ref} />;
};

const Select = forwardRef(SelectComponent) as ComponentWithStaticProperties<
  SelectProps,
  StaticProperties
>;

Select.defaultProps = defaultSelectProps;

Select.displayName = ComponentNames.Select;

Select.COLORS = SelectDeprecated.COLORS;
Select.DEFAULT_PROPS = DEFAULT_PROPS;

export default Select;
