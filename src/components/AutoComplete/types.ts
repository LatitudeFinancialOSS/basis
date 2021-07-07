import { UseComboboxState } from "downshift";
import React from "react";

export type ListItemKey = { id: string };

export type SharedAutoCompleteProps<Item> = {
  defaultValue?: Item | null;
  label: string;
  items: Item[];
  placeholder?: string;
  itemToString?: (item: Item | null) => string;
  isLoading?: boolean;
  listItem?: React.ComponentType<{ inputValue: string; item: Item | null }>;
  itemsFooter?: React.ComponentType;
  value?: Item;
  error?: string | string[];
  innerRef?: React.Ref<HTMLInputElement>;
  onChange?: (changed?: Item | null) => void;
  onBlur?: () => void;
  onFocus?: React.FocusEventHandler<HTMLInputElement>;
  onMouseDown?: React.MouseEventHandler<HTMLLabelElement>;
  selectItem?: (item: Item) => void;
  testId?: string;
  onInputValueChange?: (
    changes: Partial<UseComboboxState<Item | null>>
  ) => void;
  __internal__keyboardFocus?: boolean;
  __internal__open?: boolean;
  __internal__highlightedIndex?: number;
  __internal__loading?: boolean;
  __internal__focus?: boolean;
};

export type AutoCompleteProps<Item> = SharedAutoCompleteProps<Item> & {
  optional?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  helpText?: string;
};
