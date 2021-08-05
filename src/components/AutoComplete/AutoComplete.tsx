import { useCombobox } from "downshift";
import isEqual from "lodash.isequal";
import { nanoid } from "nanoid";
import React, { useMemo, useRef } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import useTheme from "../../hooks/useTheme";
import { useWrapperFocus } from "../../hooks/useWrapperFocus";
import mergeRefs from "../../utils/mergeRefs";
import Icon from "../Icon";
import Field from "../internal/Field";
import InternalInput from "../internal/InternalInput";
import LoadingIcon from "../LoadingIcon";
import VisuallyHidden from "../VisuallyHidden";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps, ListItemKey } from "./types";
import useGetItems from "./useGetItems";
import { getFieldErrors } from "./utils";

function AutoComplete<Item extends ListItemKey = ListItemKey>(
  props: AutoCompleteProps<Item>
) {
  const mergedProps = useMergedProps(props, defaultAutoCompleteProps);
  const theme = useTheme();

  const {
    label,
    innerRef = null,
    error,
    onChange,
    onBlur,
    onFocus,
    disabled,
    helpText,
    itemToString: itemToStringFn,
    placeholder = "Search here",
    renderItemsFooter,
    listItem: ListItem,
    onItemsFooterSelect,
    hideLabel,
    testId,
    value,
    optional,
    emptyValue,
    defaultValue,
    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
    __internal__items = [],
  } = mergedProps;

  const hasFooter = !!renderItemsFooter;

  const auxId = useMemo(() => `auto-complete-aux-${nanoid()}`, []);
  const footerId = useMemo(() => (hasFooter ? `footer-id-${nanoid()}` : ""), [
    hasFooter,
  ]);

  const { items: data, getItems, status } = useGetItems(
    props.getItems,
    footerId,
    hasFooter
  );

  const { fieldErrors, hasErrors } = getFieldErrors(error);
  const describedBy = helpText || hasErrors ? auxId : undefined;

  const itemToString = (item: Item): string => {
    if (item.id === footerId) {
      return "";
    }
    return itemToStringFn ? itemToStringFn?.(item) : item ? String(item) : "";
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const defaultItems =
    value && !isEqual(value, emptyValue) ? [value] : __internal__items;
  const items = data.length ? data : defaultItems;

  const {
    isOpen,
    getMenuProps,
    getInputProps,
    getItemProps,
    getComboboxProps,
    getToggleButtonProps,
    highlightedIndex,
    inputValue,
    selectItem,
    closeMenu,
    setInputValue,
    selectedItem,
  } = useCombobox<Item>({
    items,
    defaultSelectedItem: value || defaultValue || emptyValue,
    onInputValueChange: (changed) => {
      getItems(changed);
    },
    onSelectedItemChange: ({ selectedItem }) => {
      /**
       * 🦘 Handle the case where the menu has extra footer (eg. Cant find)
       * and we need to call onItemsFooterSelect when that item is selected.
       */
      if (selectedItem?.id === footerId) {
        onItemsFooterSelect?.();
        onChange?.(emptyValue);
        return;
      }
      if (!selectedItem) {
        onChange?.(emptyValue);
        return;
      }
      onChange?.(selectedItem);
    },
    itemToString,
  });

  const onClear = () => {
    selectItem(emptyValue);
    inputRef.current?.focus();
    closeMenu();
  };

  const menuIsOpen = isOpen || (__internal__open ?? false);
  const showClearIcon = (menuIsOpen && items.length > 0) || inputValue !== "";
  const showMagnifier = !showClearIcon;
  const loading = status === "LOADING" || __internal__loading;

  const renderListItem = (record: Item) => {
    if (ListItem) {
      return <ListItem inputValue={inputValue} item={record} />;
    }
    return (
      <span
        css={theme.autoComplete.getCSS({ targetElement: "listItemContent" })}
      >
        {itemToString ? itemToString(record) : record}
      </span>
    );
  };

  const wrapperRef = useWrapperFocus({
    onBlur: () => {
      if (highlightedIndex === -1) {
        setInputValue(itemToString(selectedItem));
      }
      setTimeout(() => {
        onBlur?.();
      });
    },
  });

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
      <div
        ref={wrapperRef}
        css={theme.autoComplete.getCSS({ targetElement: "container" })}
      >
        <div {...getComboboxProps()}>
          <InternalInput
            {...getInputProps({
              refKey: "innerRef",
              ref: mergeRefs([innerRef, inputRef]),
            })}
            label={label}
            describedBy={describedBy}
            onFocus={onFocus}
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
              showClearIcon,
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
          })}
        >
          {menuIsOpen &&
            items.map((record, index) => (
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
                {index === items.length - 1 && !!renderItemsFooter
                  ? renderItemsFooter()
                  : renderListItem(record)}
              </li>
            ))}
        </ul>
      </div>
    </Field>
  );
}

export default AutoComplete;
