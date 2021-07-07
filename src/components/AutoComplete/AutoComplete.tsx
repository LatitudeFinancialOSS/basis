import { nanoid } from "nanoid";
import React, { useMemo } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps, ListItemKey } from "./types";
import useGetItems from "./useGetItems";

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
    onFocus,
    disabled,
    helpText,
    itemToString,
    placeholder,
    itemsFooter,
    listItem,
    hideLabel,
    testId,
    // value,
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

  const { items, getItems, isLoading } = useGetItems(props.getItems);

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
        items={items}
        isLoading={isLoading ?? false}
        itemToString={itemToString}
        onChange={onChange}
        placeholder={placeholder}
        onInputValueChange={getItems}
        itemsFooter={itemsFooter}
        listItem={listItem}
        describedBy={helpText || hasErrors ? auxId : undefined}
        __internal__open={__internal__open}
        __internal__highlightedIndex={__internal__highlightedIndex}
        __internal__loading={__internal__loading}
        __internal__focus={__internal__focus}
      />
    </Field>
  );
}

export default AutoComplete;
