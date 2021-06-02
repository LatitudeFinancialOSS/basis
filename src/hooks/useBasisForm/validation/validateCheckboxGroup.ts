import {
  CheckboxOptions,
  InternalCheckboxGroupProps,
} from "../../../components/CheckboxGroup/types";

const isKeyInOptions = (key: string, options: CheckboxOptions) =>
  options.some((option) => option.key === key);

export const validateCheckboxGroup = (
  value: Record<string, boolean>,
  props: InternalCheckboxGroupProps
) => {
  const { options } = props;

  const isEmpty = Object.keys(value).every(
    (key) => !value[key] || !isKeyInOptions(key, options)
  );

  if (isEmpty) {
    return { field: "Please make a selection." };
  }

  return null;
};
