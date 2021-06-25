import { useCombobox } from "downshift";
import { nanoid } from "nanoid";
import React, { useState } from "react";
// import { SvgInline } from 'components/SvgInline/SvgInline';
import { useMergedProps } from "../../hooks/useMergedProps";
import useTheme from "../../hooks/useTheme";
import Field from "../internal/Field";
import InternalAutoComplete from "../internal/InternalAutoComplete";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps } from "./types";

function AutoComplete<Item>(props: AutoCompleteProps<Item>) {
  const theme = useTheme();

  const mergedProps = useMergedProps(props, defaultAutoCompleteProps);
  const {
    label,
    // ref,
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
    highlightColor = theme.colors.secondary.lightBlue.t25,
    itemsFooter,
    // __internal__keyboardFocus,
    hideLabel,
    children,
    testId,
  } = mergedProps;
  // const [labelId] = useState(() => `auto-complete-label-${nanoid()}`);
  // const [inputId] = useState(() => `auto-complete-input-${nanoid()}`);
  const [auxId] = useState(() => `auto-complete-aux-${nanoid()}`);
  // const {
  //   // items,
  //   // itemToString,
  //   // stateReducer,
  //   // placeholder,
  //   // isLoading,
  //   // highlightColor = theme.colors.secondary.lightBlue.t25,
  //   // itemsFooter,
  //   // __internal__keyboardFocus,
  // } = props;

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  //   const { search, data, isLoading } = useAddressSearch({ countryCode });
  //   const inputRef = useRef<HTMLInputElement>(null);

  // const {
  //   isOpen,
  //   getMenuProps,
  //   getInputProps,
  //   getItemProps,
  //   getComboboxProps,
  //   getToggleButtonProps,
  //   // closeMenu,
  //   // openMenu,
  //   // inputValue,
  //   highlightedIndex,
  // } =
  const useComboboxResult = useCombobox<Item>({
    items,
    ...(stateReducer && { stateReducer }),
    onInputValueChange,
    onSelectedItemChange,
    itemToString,
  });

  return (
    <Field
      optional={false}
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
        highlightColor={highlightColor}
        itemsFooter={itemsFooter}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : undefined}
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
  // return (
  //   <div css={theme.autoComplete.getCSS({ targetElement: "headerContainer" })}>
  //     <div {...getComboboxProps()}>
  //       <InternalInput
  //         {...getInputProps({
  //           ref: innerRef,
  //         })}
  //         label={label}
  //         onFocus={onFocus}
  //         onBlur={onBlur}
  //         error={error}
  //         placeholder={placeholder}
  //         autoComplete="off" // 🦘 ref: https://stackoverflow.com/a/50348848/340827
  //       />
  //     </div>
  //     <div>
  //       {!!isLoading && <LoadingIcon />}

  //       <button
  //         type="button"
  //         {...getToggleButtonProps()}
  //         css={{
  //           width: theme.space[11],
  //           height: theme.space[11],
  //           border: 0,
  //           background: "none",
  //           appearance: "none",
  //           cursor: "pointer",
  //         }}
  //       >
  //         <Icon name="search" />
  //         <VisuallyHidden>Search</VisuallyHidden>
  //       </button>
  //     </div>
  //     <ul {...getMenuProps()} css={styles.ul(!!error)}>
  //       {isOpen && (
  //         <>
  //           {items.map((record, index) => (
  //             <li
  //               key={record.id || index}
  //               css={styles.highlight(
  //                 highlightedIndex === index,
  //                 highlightColor
  //               )}
  //               {...getItemProps({ index, item: record })}
  //             >
  //               {itemToString ? itemToString(record) : record}
  //             </li>
  //           ))}
  //           {Footer && <Footer />}
  //         </>
  //       )}
  //     </ul>
  //   </div>
  // );
}

export default AutoComplete;
