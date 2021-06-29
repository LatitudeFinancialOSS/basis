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
  onClear: () => void;
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
  showClearIcon: boolean;
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
    onClear,
    itemToString,
    isLoading,
    highlightedIndex,
    itemsFooter: Footer,
    showClearIcon,
    innerRef,
    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
  } = props;

  const menuIsOpen = isOpen || __internal__open;
  const showMagnifier = !menuIsOpen && !showClearIcon;
  const loading = !!isLoading || __internal__loading;

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
          autoComplete="off"
          hasSuffixButton
          isLoading={loading}
        />
      </div>
      <div css={theme.autoComplete.getCSS({ targetElement: "right" })}>
        {loading && <LoadingIcon />}

        <button
          type="button"
          onClick={onClear}
          css={theme.autoComplete.getCSS({
            targetElement: "clearIcon",
            showClearIcon: showClearIcon || menuIsOpen,
          })}
        >
          <Icon name="cross" />
          <VisuallyHidden>Clear</VisuallyHidden>
        </button>

        {showMagnifier && (
          <button
            type="button"
            {...getToggleButtonProps()}
            css={theme.autoComplete.getCSS({ targetElement: "searchIcon" })}
          >
            <Icon name="search" />
            <VisuallyHidden>Search</VisuallyHidden>
          </button>
        )}
      </div>
      <ul
        {...getMenuProps()}
        css={theme.autoComplete.getCSS({
          targetElement: "ul",
          isOpen: menuIsOpen,
        })}
      >
        {menuIsOpen && (
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
