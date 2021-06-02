import React, { forwardRef } from "react";
import useIsDeprecatedForm from "../../hooks/internal/useIsDeprecatedForm";
import { ComponentWithStaticProperties } from "../../types";
import { ComponentNames } from "../componentNames";
import { defaultCheckboxGroupProps } from "./defaultCheckboxGroupProps";
import { default as CheckboxGroupInternal } from "./CheckboxGroup";
import { default as CheckboxGroupDeprecated } from "./CheckboxGroup_deprecated";
import {
  CheckboxGroupProps,
  setDeprecatedProps as shouldUseDeprecatedGroup,
} from "./types";

const { COLORS, DEFAULT_PROPS } = CheckboxGroupDeprecated;

interface StaticProperties {
  COLORS: typeof CheckboxGroupDeprecated.COLORS;
  DEFAULT_PROPS: typeof CheckboxGroupDeprecated.DEFAULT_PROPS;
}
const CheckboxGroupComponent = (
  props: CheckboxGroupProps,
  ref: React.Ref<HTMLInputElement>
) => {
  const isDeprecatedForm = useIsDeprecatedForm();

  if (shouldUseDeprecatedGroup(props, isDeprecatedForm)) {
    return <CheckboxGroupDeprecated {...props} />;
  }

  return <CheckboxGroupInternal {...props} innerRef={ref} />;
};

const CheckboxGroup = forwardRef(
  CheckboxGroupComponent
) as ComponentWithStaticProperties<CheckboxGroupProps, StaticProperties>;

CheckboxGroup.displayName = ComponentNames.CheckboxGroup;

CheckboxGroup.defaultProps = defaultCheckboxGroupProps;

CheckboxGroup.COLORS = COLORS;
CheckboxGroup.DEFAULT_PROPS = DEFAULT_PROPS;

export default CheckboxGroup;
