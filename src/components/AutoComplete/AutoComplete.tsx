import React from "react";
import { useCombobox } from "downshift";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps } from "./types";

function AutoComplete<Item>(props: AutoCompleteProps<Item | null>) {
  const mergedProps = useMergedProps(props, defaultAutoCompleteProps);

  const {
    label,
    innerRef,
    error,
    onChange,
    onBlur,
    onInputValueChange,
    onSelectedItemChange,
    onFocus,
    disabled,
    helpText,
    items,
    // getItems,
    itemToString,
    stateReducer,
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

  const [auxId] = useState(() => `auto-complete-aux-${nanoid()}`);

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;
  // const items = await getItems();

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
    // selectedItem,
  } = useCombobox<Item | null>({
    items,
    defaultSelectedItem: value,
    ...(stateReducer && { stateReducer }),
    onInputValueChange,
    onSelectedItemChange: (changed) => {
      onChange?.(changed.selectedItem);
      onSelectedItemChange?.(changed);
    },
    itemToString: (item) =>
      itemToString ? itemToString?.(item) : item ? String(item) : "",
  });

  const onClear = () => {
    selectItem(null);
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
        onSelectedItemChange={onSelectedItemChange}
        onFocus={onFocus}
        items={items}
        // emptyValue={emptyValue}
        itemToString={itemToString}
        placeholder={placeholder}
        isLoading={isLoading}
        inputValue={inputValue}
        onClear={onClear}
        showClearIcon={showClearIcon}
        itemsFooter={itemsFooter}
        isValid={!hasErrors}
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
