import { UseComboboxState, UseComboboxStateChangeOptions } from "downshift";
import React from "react";

// export type AutoCompleteProps<Item> = InternalAutoCompleteProps<Item> & {
//   optional?: boolean;
//   disabled?: boolean;

//   hideLabel?: boolean;
//   helpText?: string;
// };

type ListItem<Item> = Item & {
  id: string;
};

export type InternalAutoCompleteProps<Item> = {
  defaultValue?: any;
  label: string;
  items: ListItem<Item>[];
  emptyValue: Item;
  placeholder?: string;
  itemToString?: (item: Item) => string;
  isLoading?: boolean;
  // highlightColor?: string;
  // toggleIcon?: React.ComponentType;
  itemsFooter?: React.ComponentType;
  // color?: CheckboxColor;
  value?: Item;
  error?: string | string[];
  innerRef?: React.Ref<HTMLInputElement>;
  onChange?: (isChecked: boolean) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  selectItem?: (item: Item) => void;
  children: React.ReactNode;
  testId?: string;
  onInputValueChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  onSelectedItemChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  stateReducer?: (
    state: UseComboboxState<Item>,
    actionAndChanges: UseComboboxStateChangeOptions<Item>
  ) => UseComboboxState<Item>;
  __internal__keyboardFocus?: boolean;
  __internal__open?: boolean;
  __internal__highlightedIndex?: number;
  __internal__loading?: boolean;
  __internal__focus?: boolean;
};

export type AutoCompleteProps<Item> = InternalAutoCompleteProps<Item> & {
  optional?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  helpText?: string;
};
