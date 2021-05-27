import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { defaultCheckboxProps } from "./defaultCheckboxProps";
import { default as CheckboxInternal } from "./Checkbox";
import { default as CheckboxDeprecated } from "./Checkbox_deprecated";
import {
  CheckboxProps,
  setDeprecatedProps as shouldUseDeprecatedCheckbox,
} from "./types";

const { COLORS, DEFAULT_PROPS } = CheckboxDeprecated;

interface StaticProperties {
  COLORS: typeof CheckboxDeprecated.COLORS;
  DEFAULT_PROPS: typeof CheckboxDeprecated.DEFAULT_PROPS;
}

const CheckboxComponent = (
  props: CheckboxProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedCheckbox(props, isDeprecatedForm)) {
    return <CheckboxDeprecated {...props} />;
  }

  return <CheckboxInternal {...props} innerRef={ref} />;
};

const Checkbox = forwardRef(CheckboxComponent) as ComponentWithStaticProperties<
  CheckboxProps,
  StaticProperties
>;

Checkbox.displayName = ComponentNames.Checkbox;

Checkbox.defaultProps = defaultCheckboxProps;

Checkbox.COLORS = COLORS;
Checkbox.DEFAULT_PROPS = DEFAULT_PROPS;

export default Checkbox;
