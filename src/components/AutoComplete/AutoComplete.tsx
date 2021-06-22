import React from "react";
import { InternalAutoCompleteProps } from "./types";
import { useCombobox } from "downshift";
// import { mergeRefs } from "library/utils";
// import { forwardRef, Ref, useRef } from "react";
// import { SearchAddress } from "./api/addressApi";
// import * as styles from "./AutoAddress.style";
// import { BoldLineItem } from "./BoldLineItem";
// import { useAddressSearch } from "./hook/useAddressSearch";
// import { stateReducer } from "./reducer";
// import { CountryCode } from "./types";
// import { itemToString } from "./utils";
import Input from "../Input";
// import useTheme from "../../hooks/useTheme";
import * as styles from "./AutoComplete.styles";

import useTheme from "../../hooks/useTheme";
import LoadingIcon from "../LoadingIcon";
// import { SvgInline } from 'components/SvgInline/SvgInline';

function AutoComplete<Item>(props: InternalAutoCompleteProps<Item>) {
  const theme = useTheme();

  const {
    label,
    // ref,
    error,
    // defaultValue,
    onBlur,
    onInputValueChange,
    onSelectedItemChange,
    onFocus,
    // onCantFind,
    items,
    itemToString,
    // stateReducer,
    placeholder = "Search here",
    isLoading,
    highlightColor = theme.colors.secondary.lightBlue.t25,
    toggleIcon: Toggle,
  } = props;

  //   const { search, data, isLoading } = useAddressSearch({ countryCode });
  //   const inputRef = useRef<HTMLInputElement>(null);

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    getToggleButtonProps,
    // closeMenu,
    // openMenu,
    // inputValue,
    highlightedIndex,
  } = useCombobox<Item>({
    items,
    // stateReducer,
    onInputValueChange,
    onSelectedItemChange,
    itemToString,
  });

  return (
    <div css={styles.container}>
      <div {...getComboboxProps()}>
        <Input
          {...getInputProps({
            // ref: mergeRefs([ref, inputRef]),
          })}
          label={label}
          onFocus={onFocus}
          onBlur={onBlur}
          error={error}
          placeholder={placeholder}
          autoComplete="new-address" // 🦘 ref: https://stackoverflow.com/a/50348848/340827
        />
      </div>
      <div css={styles.right(!!error)}>
        {!!isLoading && <LoadingIcon />}
        {Toggle && (
          <button
            type="button"
            {...getToggleButtonProps()}
            aria-label="toggle menu"
          >
            <Toggle />
            {/* <SvgInline name="magnifier" css={styles.searchIcon} size="32" /> */}
          </button>
        )}
      </div>
      <ul {...getMenuProps()} css={styles.ul(!!error)}>
        {isOpen && (
          <>
            {items.map((record, index) => (
              <li
                key={record.key || index}
                css={styles.highlight(
                  highlightedIndex === index,
                  highlightColor
                )}
                {...getItemProps({ index, item: record })}
              >
                {/* <SvgInline name="core-location" size="32" css={styles.svg} /> */}
                {/* <BoldLineItem text={itemToString(record)} query={inputValue} /> */}
                {itemToString ? itemToString(record) : record}
              </li>
            ))}
            {/* <li>
              <Link
                href="#"
                newTab={false}
                css={styles.link}
                onClick={handleCantFind}
              >
                <b>Can't find your address?</b>
              </Link>
            </li> */}
          </>
        )}
      </ul>
    </div>
  );
}

export default AutoComplete;
