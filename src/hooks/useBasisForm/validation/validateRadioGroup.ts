import { RadioOptions } from "../../../components/internal/InternalRadioGroup";
import { InternalRadioGroupProps } from "../../../components/RadioGroup/types";

const isRadioGroupEmpty = (value: string, options: RadioOptions) =>
  options.findIndex((option) => option.value === value) === -1;

export const validateRadioGroup = (
  value: string,
  props: Record<string, any>
) => {
  const { options } = props as InternalRadioGroupProps;

  if (isRadioGroupEmpty(value, options)) {
    return "Please make a selection.";
  }

  return null;
};
