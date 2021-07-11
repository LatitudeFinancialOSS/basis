import { UseComboboxState } from "downshift";
import { Dispatch, useCallback, useReducer } from "react";
import { Action, ActionType, AutoCompleteProps, InternalState } from "./types";

const reducer = <Item,>(
  state: InternalState<Item>,
  action: Action<Item>
): InternalState<Item> => ({ ...state, ...action.payload });

function useGetItems<Item>(
  getItemsSource: AutoCompleteProps<Item | null>["getItems"]
) {
  const initial = {
    isLoading: false,
    items: [] as Item[],
  };

  const [state, dispatch] = useReducer(reducer, initial) as [
    InternalState<Item>,
    Dispatch<Action<Item>>
  ];

  const getItems = useCallback(
    async (changed?: Partial<UseComboboxState<Item | null>>) => {
      if (!getItemsSource) {
        return;
      }
      dispatch({
        type: ActionType.UPDATE_LOADING,
        payload: { isLoading: true },
      });

      try {
        const res = await getItemsSource({
          inputValue: changed?.inputValue,
        });

        const items = res.filter(Boolean) as Item[]; // 🚨 Make sure we don't have array of null

        dispatch({
          type: ActionType.LOAD_ITEMS_SUCCESS,
          payload: { items },
        });
      } catch (error) {
        console.error("Basis cannot get items!", error);
      } finally {
        dispatch({
          type: ActionType.UPDATE_LOADING,
          payload: { isLoading: false, isError: true },
        });
      }
    },
    [getItemsSource]
  );

  return { ...state, getItems };
}

export default useGetItems;
