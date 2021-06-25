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
  placeholder?: string;
  itemToString: (item: Item) => string;
  isLoading?: boolean;
  highlightColor?: string;
  toggleIcon?: React.ComponentType;
  itemsFooter?: React.ComponentType;
  // color?: CheckboxColor;
  value?: boolean;
  error?: string | string[];
  innerRef?: React.Ref<HTMLInputElement>;
  onChange?: (isChecked: boolean) => void;
  onBlur?: React.FocusEventHandler<HTMLInputElement>;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  children: React.ReactNode;
  testId?: string;
  onInputValueChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  onSelectedItemChange?: (changes: Partial<UseComboboxState<Item>>) => void;
  stateReducer?: (
    state: UseComboboxState<Item>,
    actionAndChanges: UseComboboxStateChangeOptions<Item>
  ) => UseComboboxState<Item>;
  __internal__keyboardFocus?: boolean;
};

export type AutoCompleteProps<Item> = InternalAutoCompleteProps<Item> & {
  optional?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  helpText?: string;
};
