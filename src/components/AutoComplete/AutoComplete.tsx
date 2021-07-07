import { useCombobox } from "downshift";
import { nanoid } from "nanoid";
import React, { useMemo } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps, ListItemKey } from "./types";

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
    onInputValueChange,
    onFocus,
    disabled,
    helpText,
    items,
    itemToString: itemToStringFn,
    placeholder,
    isLoading,
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
    items,
    defaultSelectedItem: value,
    onInputValueChange,
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
        onInputValueChange={onInputValueChange}
        onFocus={onFocus}
        items={items}
        itemToString={itemToString}
        placeholder={placeholder}
        isLoading={isLoading}
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
