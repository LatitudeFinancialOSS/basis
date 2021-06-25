// import { InternalAutoCompleteProps } from "./types";
import {
  UseComboboxGetComboboxPropsOptions,
  UseComboboxGetInputPropsOptions,
  UseComboboxGetItemPropsOptions,
  UseComboboxGetMenuPropsOptions,
  UseComboboxGetToggleButtonPropsOptions,
} from "downshift";
import React from "react";
import useTheme from "../../hooks/useTheme";
import { InternalAutoCompleteProps } from "../AutoComplete/types";
// import Button from "../Button";
import Icon from "../Icon";
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
import LoadingIcon from "../LoadingIcon";
import VisuallyHidden from "../VisuallyHidden";
// import useTheme from "../../hooks/useTheme";

type Props<Item> = InternalAutoCompleteProps<Item> & {
  isValid: boolean;
  isOpen: boolean;
  getMenuProps: (options?: UseComboboxGetMenuPropsOptions | undefined) => any;
  getInputProps: (options?: UseComboboxGetInputPropsOptions | undefined) => any;
  getItemProps: (options: UseComboboxGetItemPropsOptions<Item>) => any;
  getComboboxProps: (
    options?: UseComboboxGetComboboxPropsOptions | undefined
  ) => any;
  getToggleButtonProps: (
    options?: UseComboboxGetToggleButtonPropsOptions | undefined
  ) => any;
  highlightedIndex: number;
  describedBy?: string;
};

function InternalAutoComplete<Item>(props: Props<Item>) {
  const theme = useTheme();
  const {
    label,
    onBlur,
    onFocus,
    placeholder,
    items,
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    getToggleButtonProps,
    // closeMenu,
    // openMenu,
    // inputValue,
    itemToString,
    isLoading,
    highlightedIndex,
    itemsFooter: Footer,
    innerRef,
  } = props;
  // const { inputColorMap } = useBackground();

  return (
    <div
      css={theme.autoComplete.getCSS({ targetElement: "container" })}
      // css={styles.container}
    >
      <div {...getComboboxProps()}>
        <InternalInput
          {...getInputProps({
            // // ref: mergeRefs([ref, inputRef]),
            // ref: innerRef,
            refKey: "innerRef",
            ref: innerRef,
            // refKey: "innerRef",
          })}
          label={label}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="off" // 🦘 ref: https://stackoverflow.com/a/50348848/340827
        />
      </div>
      <div css={theme.autoComplete.getCSS({ targetElement: "right" })}>
        {!!isLoading && <LoadingIcon />}
        {/* <SvgInline name="magnifier" css={styles.searchIcon} size="32" /> */}

        <button
          type="button"
          {...getToggleButtonProps()}
          //   theme.space.
          css={theme.autoComplete.getCSS({ targetElement: "searchIcon" })}
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
      <ul
        {...getMenuProps()}
        css={theme.autoComplete.getCSS({ targetElement: "ul", isOpen })}
      >
        {isOpen && (
          <>
            {items.map((record, index) => (
              <li
                key={record.id || index}
                css={theme.autoComplete.getCSS({
                  targetElement: "li",
                  isHighlighted: highlightedIndex === index,
                })}
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

export default InternalAutoComplete;
