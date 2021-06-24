import { UseComboboxState, UseComboboxStateChangeOptions } from "downshift";
import React from "react";

type ListItem<Item> = Item & {
  id: string;
};

export type InternalAutoCompleteProps<Item> = {
  label: string;
  // ref?: React.Ref<HTMLInputElement>;
  innerRef?: React.Ref<HTMLInputElement>;
  error?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  defaultValue?: any;
  //   onChange?: (props: { value: string; autoFields: SearchAddress }) => void;
  onInputValueChange?: (changes: Partial<UseComboboxState<Item>>) => void;
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
  itemToString: (item: Item) => string;
  isLoading?: boolean;
  highlightColor?: string;
  toggleIcon?: React.ComponentType;
  itemsFooter?: React.ComponentType;
  // itemToString;
};

export type AutoCompleteProps<Items> = InternalAutoCompleteProps<Items>;
