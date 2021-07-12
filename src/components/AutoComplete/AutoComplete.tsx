import { nanoid } from "nanoid";
import React, { useMemo } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps, ListItemKey } from "./types";
import useGetItems from "./useGetItems";

const getFieldErrors = (
  error: string | string[] | undefined
): { fieldErrors: string[] | undefined; hasErrors: boolean } => {
  if (error === undefined) {
    return { fieldErrors: undefined, hasErrors: false };
  }

  if (Array.isArray(error)) {
    return {
      fieldErrors: error,
      hasErrors: true,
    };
  }

  return { fieldErrors: [error], hasErrors: true };
};

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
    value,
    optional,
    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
  } = mergedProps;

  const { items, getItems, status } = useGetItems(props.getItems);

  const auxId = useMemo(() => `auto-complete-aux-${nanoid()}`, []);
  const { fieldErrors, hasErrors } = getFieldErrors(error);
  const describeBy = helpText || hasErrors ? auxId : undefined;

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
        isLoading={status === "LOADING"}
        itemToString={itemToString}
        onChange={onChange}
        placeholder={placeholder}
        onInputValueChange={getItems}
        value={value}
        itemsFooter={itemsFooter}
        listItem={listItem}
        describedBy={describeBy}
        __internal__open={__internal__open}
        __internal__highlightedIndex={__internal__highlightedIndex}
        __internal__loading={__internal__loading}
        __internal__focus={__internal__focus}
      />
    </Field>
  );
}

export default AutoComplete;
