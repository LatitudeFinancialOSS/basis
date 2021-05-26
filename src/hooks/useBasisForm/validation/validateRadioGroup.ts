import {
  InternalRadioGroupProps,
  RadioOption,
  RadioOptions,
} from "../../../components/RadioGroup/types";

const isRadioGroupEmpty = (value: string, options: RadioOptions) =>
  options.findIndex((option: RadioOption) => option.value === value) === -1;

export const validateRadioGroup = (
  value: string,
  props: InternalRadioGroupProps
) => {
  const { options } = props;

  if (isRadioGroupEmpty(value, options)) {
    return "Please make a selection.";
  }

  return null;
};
