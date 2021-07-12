import { UseComboboxState } from "downshift";
import React from "react";

export type ListItemKey = { id: string };

export type SharedAutoCompleteProps<Item> = {
  defaultValue?: Item | null;
  label: string;
  placeholder?: string;
  itemToString?: (item: Item | null) => string;
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
  __internal__keyboardFocus?: boolean;
  __internal__open?: boolean;
  __internal__highlightedIndex?: number;
  __internal__loading?: boolean;
  __internal__focus?: boolean;
};

export type AutoCompleteProps<Item> = SharedAutoCompleteProps<Item> & {
  getItems: {
    fn: (
      item: Pick<Partial<UseComboboxState<Item | null>>, "inputValue">
    ) => Item[];
    error?: string;
  };
  optional?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  helpText?: string;
};

export type InternalState<Item> = {
  isLoading: boolean;
  isError?: boolean;
  error?: string;
  items: Item[];
};

export enum ActionType {
  LOAD_ITEMS_SUCCESS = "LOAD_ITEMS_SUCCESS",
  UPDATE_STATE = "UPDATE_STATE",
}

export type Action<Item> =
  | {
      type: ActionType.UPDATE_STATE;
      payload: { isLoading: boolean; isError?: boolean; error?: string };
    }
  | {
      type: ActionType.LOAD_ITEMS_SUCCESS;
      payload: {
        items: Item[];
        isLoading: boolean;
        isError?: boolean;
      };
    };
