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
  getItems: (
    item: Pick<Partial<UseComboboxState<Item | null>>, "inputValue">
  ) => Item[];
  optional?: boolean;
  disabled?: boolean;
  hideLabel?: boolean;
  helpText?: string;
};

// export type InternalState<Item> = {
//   isLoading?: boolean;
//   items?: Item[];
// };

export type InternalState<Item> = {
  isLoading: boolean;
  isError?: boolean;
  items: Item[];
};

export enum ActionType {
  LOAD_ITEMS = "LOAD_ITEMS",
  LOAD_ITEMS_SUCCESS = "LOAD_ITEMS_SUCCESS",
  LOAD_ITEMS_ERROR = "LOAD_ITEMS_ERROR",
  UPDATE_LOADING = "UPDATE_LOADING",
}

export type Action<Item> =
  | {
      type: ActionType.LOAD_ITEMS | ActionType.LOAD_ITEMS_ERROR;
      payload: {}; // 🐨  Make sure we have a unified payload actions so reducer is simpler!
    }
  | {
      type: ActionType.UPDATE_LOADING;
      payload: { isLoading: boolean; isError?: boolean };
    }
  | {
      type: ActionType.LOAD_ITEMS_SUCCESS;
      payload: {
        items: Item[];
      };
    };
