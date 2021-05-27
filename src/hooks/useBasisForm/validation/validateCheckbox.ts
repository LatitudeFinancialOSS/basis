import { InternalCheckboxProps } from "../../../components/Checkbox/types";

export const validateCheckbox = (
  value: boolean,
  props: InternalCheckboxProps
) => {
  if (!props.optional && !value) {
    return "Must be checked";
  }

  return null;
};
