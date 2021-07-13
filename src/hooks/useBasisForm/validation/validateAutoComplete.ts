import isEqual from "lodash.isequal";
import { AutoCompleteProps } from "../../../components/AutoComplete/types";

export const validateAutoComplete = <Item>(
  value: Item,
  autoCompleteProps: AutoCompleteProps<Item>
) => {
  const { optional, emptyValue } = autoCompleteProps;

  if (isEqual(value, emptyValue) && !optional) {
    return "Required";
  }

  return null;
};
