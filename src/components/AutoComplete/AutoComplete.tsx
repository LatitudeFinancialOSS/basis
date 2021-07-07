import { useCombobox } from "downshift";
import { nanoid } from "nanoid";
import React, { useMemo, useState } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps, InternalState, ListItemKey } from "./types";

function AutoComplete<Item extends ListItemKey = ListItemKey>(
  props: AutoCompleteProps<Item>
) {
  const mergedProps = useMergedProps(props, defaultAutoCompleteProps);

  const {
    label,
    innerRef,
    error,
    onChange,
    onBlur,
    getItems,
    onFocus,
    disabled,
    helpText,
    itemToString: itemToStringFn,
    placeholder,
    itemsFooter,
    listItem,
    hideLabel,
    testId,
    value,
    optional,
    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
  } = mergedProps;

  const auxId = useMemo(() => `auto-complete-aux-${nanoid()}`, []);

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  const itemToString = (item: Item | null): string =>
    itemToStringFn ? itemToStringFn?.(item) : item ? String(item) : "";
  const [internalState, setInternalState] = useState<InternalState<Item>>({});

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    getToggleButtonProps,
    highlightedIndex,
    inputValue,
    selectItem,
    closeMenu,
  } = useCombobox<Item | null>({
    items: internalState.items || [],
    defaultSelectedItem: value,
    onInputValueChange: async (changed) => {
      if (!changed.inputValue) {
        return;
      }

      setInternalState({ isLoading: true });
      try {
        const items = await getItems({ inputValue: changed.inputValue });
        setInternalState({ isLoading: false, items });
      } catch (error) {
        console.error("Basis cannot get items!");
      }
      setInternalState({ isLoading: false });
    },
    onSelectedItemChange: (changed) => {
      onChange?.(changed.selectedItem);
    },
    itemToString: (item) =>
      itemToStringFn ? itemToStringFn?.(item) : item ? String(item) : "",
  });

  const onClear = () => {
    selectItem(null);
    closeMenu();
  };

  const showClearIcon = inputValue !== "";

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      hideLabel={hideLabel}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
      testId={testId}
    >
      <InternalAutoComplete<Item>
        label={label}
        innerRef={innerRef}
        onBlur={onBlur}
        onFocus={onFocus}
        items={internalState.items || []}
        isLoading={internalState.isLoading ?? false}
        itemToString={itemToString}
        placeholder={placeholder}
        inputValue={inputValue}
        onClear={onClear}
        showClearIcon={showClearIcon}
        itemsFooter={itemsFooter}
        listItem={listItem}
        describedBy={helpText || hasErrors ? auxId : undefined}
        __internal__open={__internal__open}
        __internal__highlightedIndex={__internal__highlightedIndex}
        __internal__loading={__internal__loading}
        __internal__focus={__internal__focus}
        isOpen={isOpen}
        getMenuProps={getMenuProps}
        getInputProps={getInputProps}
        getItemProps={getItemProps}
        getComboboxProps={getComboboxProps}
        getToggleButtonProps={getToggleButtonProps}
        highlightedIndex={highlightedIndex}
      />
    </Field>
  );
}

export default AutoComplete;
