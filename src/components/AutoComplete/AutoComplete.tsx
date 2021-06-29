import { useCombobox } from "downshift";
import { nanoid } from "nanoid";
import { useState } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
// import useTheme from "../../hooks/useTheme";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps } from "./types";

function AutoComplete<Item>(props: AutoCompleteProps<Item>) {
  // const theme = useTheme();

  const mergedProps = useMergedProps(props, defaultAutoCompleteProps);

  const {
    label,
    innerRef,
    error,
    // defaultValue,
    onBlur,
    onInputValueChange,
    onSelectedItemChange,
    onFocus,
    disabled,
    // onCantFind,
    helpText,
    items,
    itemToString,
    stateReducer,
    placeholder,
    isLoading,
    // highlightColor = theme.colors.secondary.lightBlue.t25,
    itemsFooter,
    // __internal__keyboardFocus,
    hideLabel,
    children,
    testId,
    optional,
    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
  } = mergedProps;

  // const [inputValue, setInputValue] = useState("");
  // const [labelId] = useState(() => `auto-complete-label-${nanoid()}`);
  // const [inputId] = useState(() => `auto-complete-input-${nanoid()}`);
  const [auxId] = useState(() => `auto-complete-aux-${nanoid()}`);

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  // const { clearSelection } =
  const useComboboxResult = useCombobox<Item>({
    items,
    // inputValue,
    ...(stateReducer && { stateReducer }),
    onInputValueChange,
    // onInputValueChange: (e) => {
    //   if (e.inputValue) {
    //     setInputValue(e.inputValue);
    //   }
    //   onInputValueChange?.(e);
    // },
    onSelectedItemChange,
    itemToString: (item) =>
      itemToString ? itemToString?.(item) : String(item),
  });

  // const { selectItem } = useComboboxResult;
  const { setInputValue, inputValue } = useComboboxResult;

  const onClear = () => {
    setInputValue("");
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
        itemToString={itemToString}
        placeholder={placeholder}
        isLoading={isLoading}
        // highlightColor={highlightColor}
        onClear={onClear}
        showClearIcon={showClearIcon}
        itemsFooter={itemsFooter}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : undefined}
        __internal__open={__internal__open}
        __internal__highlightedIndex={__internal__highlightedIndex}
        __internal__loading={__internal__loading}
        __internal__focus={__internal__focus}
        // isOpen={isOpen}
        // getMenuProps={getMenuProps}
        // getInputProps={getInputProps}
        // getItemProps={getItemProps}
        // getComboboxProps={getComboboxProps}
        // getToggleButtonProps={getToggleButtonProps}
        // highlightedIndex={highlightedIndex}
        {...useComboboxResult}
      >
        {children}
      </InternalAutoComplete>
    </Field>
  );
}

export default AutoComplete;
