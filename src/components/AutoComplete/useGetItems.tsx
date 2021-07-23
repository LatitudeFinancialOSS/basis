import { UseComboboxState } from "downshift";
import { Dispatch, useCallback, useReducer } from "react";
import { Action, ActionType, AutoCompleteProps, InternalState } from "./types";

const reducer = <Item,>(
  state: InternalState<Item>,
  action: Action<Item>
): InternalState<Item> => ({ ...state, ...action.payload });

function useGetItems<Item>(
  getItemsSource: AutoCompleteProps<Item>["getItems"],
  footerId: string,
  hasItemsFooter: boolean
) {
  const initial: InternalState<Item> = {
    status: "IDLE",
    items: [],
  };

  const [state, dispatch] = useReducer(reducer, initial) as [
    InternalState<Item>,
    Dispatch<Action<Item>>
  ];

  const getItems = useCallback(
    async (changed?: Partial<UseComboboxState<Item>>) => {
      if (!getItemsSource) {
        return;
      }
      dispatch({
        type: ActionType.UPDATE_STATE,
        payload: { status: "LOADING" },
      });

      try {
        const data = await getItemsSource({
          inputValue: changed?.inputValue,
        });

        const apiItems = hasItemsFooter ? [...data, { id: footerId }] : data;
        const items = (apiItems || []).filter(Boolean) as Item[]; // 🚨 Make sure we don't have array of null (ie. null[])

        dispatch({
          type: ActionType.LOAD_ITEMS_SUCCESS,
          payload: { items, status: "SUCCESS" },
        });
      } catch (error) {
        const message = "Basis cannot get items!";
        console.error(message, error);
        dispatch({
          type: ActionType.UPDATE_STATE,
          payload: {
            status: "ERROR",
            error: message,
          },
        });
      }
    },
    [footerId, getItemsSource, hasItemsFooter]
  );

  return { ...state, getItems };
}

export default useGetItems;
