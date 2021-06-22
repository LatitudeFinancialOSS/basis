import { UseComboboxState, UseComboboxStateChangeOptions } from "downshift";
import React from "react";

type ListItem<Item> = Item & {
  key: string;
};
export type InternalAutoCompleteProps<Item> = {
  label: string;
  ref?: React.Ref<HTMLInputElement>;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  //   onChange?: (props: { value: string; autoFields: SearchAddress }) => void;
  onChange?: <Item>(changes: Partial<UseComboboxState<Item>>) => void;
  onSelectedItemChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  stateReducer?: (
    state: UseComboboxState<Item>,
    actionAndChanges: UseComboboxStateChangeOptions<Item>
  ) => UseComboboxState<Item>;
  onBlur?: () => void;
  onFocus?: () => void;
  // onCantFind?: () => void;
  items: ListItem<Item>[];
  placeholder?: string;
  itemToString?: (item: Item) => string;
  isLoading?: boolean;
  highlightColor?: string;
  // itemToString;
};
