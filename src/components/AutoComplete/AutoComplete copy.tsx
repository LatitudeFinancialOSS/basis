import React from "react";
import { AutoCompleteProps } from "./types";
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
// import Input from "../Input";
import InternalInput from "../internal/InternalInput";

// import useTheme from "../../hooks/useTheme";
import * as styles from "../internal/AutoComplete.styles";

import useTheme from "../../hooks/useTheme";
import LoadingIcon from "../LoadingIcon";
import VisuallyHidden from "../VisuallyHidden";
// import Button from "../Button";
import Icon from "../Icon";
// import { SvgInline } from 'components/SvgInline/SvgInline';

function AutoComplete<Item>(props: AutoCompleteProps<Item>) {
  const theme = useTheme();

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
    // onCantFind,
    items,
    itemToString,
    stateReducer,
    placeholder = "Search here",
    isLoading,
    highlightColor = theme.colors.secondary.lightBlue.t25,
    itemsFooter: Footer,
    // toggleIcon: Toggle,
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
    ...(stateReducer && { stateReducer }),
    onInputValueChange,
    onSelectedItemChange,
    itemToString,
  });

  return (
    <div
      css={theme.autoComplete.getCSS({ targetElement: "headerContainer" })}
      // css={styles.container}
    >
      <div {...getComboboxProps()}>
        <InternalInput
          {...getInputProps({
            // ref: mergeRefs([ref, inputRef]),
            ref: innerRef,
          })}
          label={label}
          onFocus={onFocus}
          onBlur={onBlur}
          error={error}
          placeholder={placeholder}
          autoComplete="off" // 🦘 ref: https://stackoverflow.com/a/50348848/340827
        />
      </div>
      <div
      // css={styles.right(!!error)}
      >
        {!!isLoading && <LoadingIcon />}
        {/* <SvgInline name="magnifier" css={styles.searchIcon} size="32" /> */}

        <button
          type="button"
          {...getToggleButtonProps()}
          //   theme.space.
          css={{
            width: theme.space[11],
            height: theme.space[11],
            border: 0,
            background: "none",
            appearance: "none",
            cursor: "pointer",
          }}
          //   aria-label="toggle menu"
        >
          <Icon name="search" />
          <VisuallyHidden>Search</VisuallyHidden>
        </button>

        {/* <Button {...getToggleButtonProps()} variant="icon">
          <Icon name="search" />
          <VisuallyHidden>Search</VisuallyHidden>
        </Button> */}
      </div>
      <ul {...getMenuProps()} css={styles.ul(!!error)}>
        {isOpen && (
          <>
            {items.map((record, index) => (
              <li
                key={record.id || index}
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
            {Footer && <Footer />}

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
