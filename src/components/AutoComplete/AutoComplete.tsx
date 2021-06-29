import React from "react";
import { useCombobox } from "downshift";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps } from "./types";

function AutoComplete<Item>(props: AutoCompleteProps<Item>) {
  const mergedProps = useMergedProps(props, defaultAutoCompleteProps);

  const {
    label,
    innerRef,
    error,
    onBlur,
    onInputValueChange,
    onSelectedItemChange,
    onFocus,
    disabled,
    helpText,
    items,
    itemToString,
    stateReducer,
    placeholder,
    isLoading,
    itemsFooter,
    emptyValue,
    hideLabel,
    testId,
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

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    getToggleButtonProps,
    highlightedIndex,
    setInputValue,
    inputValue,
    selectItem,
  } = useCombobox<Item>({
    items,
    ...(stateReducer && { stateReducer }),
    onInputValueChange,
    onSelectedItemChange,
    itemToString: (item) =>
      itemToString ? itemToString?.(item) : String(item),
  });

  const onClear = () => {
    setInputValue("");
    selectItem(emptyValue);
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
        emptyValue={emptyValue}
        itemToString={itemToString}
        placeholder={placeholder}
        isLoading={isLoading}
        onClear={onClear}
        showClearIcon={showClearIcon}
        itemsFooter={itemsFooter}
        isValid={!hasErrors}
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
