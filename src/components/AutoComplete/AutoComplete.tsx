import { useCombobox } from "downshift";
import { nanoid } from "nanoid";
import React, { useMemo, useRef } from "react";
import { useMergedProps } from "../../hooks/useMergedProps";
import useTheme from "../../hooks/useTheme";
import Icon from "../Icon";
import Field from "../internal/Field";
import InternalInput from "../internal/InternalInput";
import LoadingIcon from "../LoadingIcon";
import VisuallyHidden from "../VisuallyHidden";
import { defaultAutoCompleteProps } from "./defaultAutoCompleteProps";
import { AutoCompleteProps, ListItemKey } from "./types";
import useGetItems from "./useGetItems";
import { useWrapperFocus } from "../../hooks/useWrapperFocus";
import mergeRefs from "../../utils/mergeRefs";

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
    placeholder,
    itemsFooter: Footer,
    listItem: ListItem,
    hideLabel,
    testId,
    value,
    optional,
    emptyValue,

    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
  } = mergedProps;

  const { items: data, getItems, status } = useGetItems(props.getItems);

  const auxId = useMemo(() => `auto-complete-aux-${nanoid()}`, []);
  const { fieldErrors, hasErrors } = getFieldErrors(error);
  const describedBy = helpText || hasErrors ? auxId : undefined;

  const itemToString = (item: Item): string =>
    itemToStringFn ? itemToStringFn?.(item) : item ? String(item) : "";
  const inputRef = useRef<HTMLInputElement>(null);

  const defaultValue = value || props.defaultValue;
  const defaultItems = defaultValue ? [defaultValue] : [];
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
      if (!selectedItem) {
        onChange?.(emptyValue);
      } else {
        onChange?.(selectedItem);
      }
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
    return itemToString ? itemToString(record) : record;
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
            tabIndex={-1}
            css={theme.autoComplete.getCSS({
              targetElement: "clearIcon",
              showClearIcon: showClearIcon,
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
                  {renderListItem(record)}
                </li>
              ))}
              {Footer && <Footer closeMenu={closeMenu} />}
            </>
          )}
        </ul>
      </div>
    </Field>
  );
}

export default AutoComplete;
