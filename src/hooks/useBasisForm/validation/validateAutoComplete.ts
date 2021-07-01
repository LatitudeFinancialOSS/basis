import { AutoCompleteProps } from "../../../components/AutoComplete/types";

export const validateAutoComplete = <Item>(
  value: Item | null,
  autoCompleteProps: AutoCompleteProps<Item>
) => {
  const { optional } = autoCompleteProps;

  if (value === null) {
    return optional ? null : "Required";
  }

  return null;
};
