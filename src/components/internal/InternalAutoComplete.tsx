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
import Icon from "../Icon";
import InternalInput from "../internal/InternalInput";
import LoadingIcon from "../LoadingIcon";
import VisuallyHidden from "../VisuallyHidden";

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
    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
  } = props;
  // const { inputColorMap } = useBackground();

  return (
    <div css={theme.autoComplete.getCSS({ targetElement: "container" })}>
      <div {...getComboboxProps()}>
        <InternalInput
          {...getInputProps({ refKey: "innerRef", ref: innerRef })}
          label={label}
          onFocus={onFocus}
          onBlur={onBlur}
          placeholder={placeholder}
          __internal__focus={__internal__focus}
          autoComplete="off" // 🦘 ref: https://stackoverflow.com/a/50348848/340827
        />
      </div>
      <div css={theme.autoComplete.getCSS({ targetElement: "right" })}>
        {(!!isLoading || __internal__loading) && <LoadingIcon />}
        <button
          type="button"
          {...getToggleButtonProps()}
          css={theme.autoComplete.getCSS({ targetElement: "searchIcon" })}
        >
          <Icon name="search" />
          <VisuallyHidden>Search</VisuallyHidden>
        </button>
      </div>
      <ul
        {...getMenuProps()}
        css={theme.autoComplete.getCSS({ targetElement: "ul", isOpen })}
      >
        {(isOpen || __internal__open) && (
          <>
            {items.map((record, index) => (
              <li
                key={record.id || index}
                css={theme.autoComplete.getCSS({
                  targetElement: "li",
                  isHighlighted:
                    highlightedIndex === index ||
                    __internal__highlightedIndex === index,
                })}
                {...getItemProps({ index, item: record })}
              >
                {itemToString ? itemToString(record) : record}
              </li>
            ))}
            {Footer && <Footer />}
          </>
        )}
      </ul>
    </div>
  );
}

export default InternalAutoComplete;
