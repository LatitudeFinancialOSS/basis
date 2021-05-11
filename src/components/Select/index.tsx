import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { default as SelectInternal } from "./Select";
import { default as SelectDeprecated } from "./Select_deprecated";
import {
  SelectProps,
  setDeprecatedProps as shouldUseDeprecatedSelect,
} from "./types";

const DEFAULT_PROPS = {
  ...SelectDeprecated.DEFAULT_PROPS,
  disabled: false,
  optional: false,
} as const;

interface StaticProperties {
  displayName: string;
  COLORS: typeof SelectDeprecated.COLORS;
  DEFAULT_PROPS: typeof DEFAULT_PROPS;
}

// can't be an arrow function due to: https://github.com/yannickcr/eslint-plugin-react/issues/2269
const Select = forwardRef(function SelectComponent(props: SelectProps, ref) {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedSelect(props, isDeprecatedForm)) {
    return <SelectDeprecated {...props} />;
  }

  return <SelectInternal {...props} innerRef={ref} />;
}) as ComponentWithStaticProperties<SelectProps, StaticProperties>;

Select.displayName = ComponentNames.Select;

Select.COLORS = SelectDeprecated.COLORS;
Select.DEFAULT_PROPS = DEFAULT_PROPS;

export default Select;
