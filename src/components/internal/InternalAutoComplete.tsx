import { useCombobox, UseComboboxState } from "downshift";
import React from "react";
import useTheme from "../../hooks/useTheme";
import { ListItemKey, SharedAutoCompleteProps } from "../AutoComplete/types";
import Icon from "../Icon";
import InternalInput from "../internal/InternalInput";
import LoadingIcon from "../LoadingIcon";
import VisuallyHidden from "../VisuallyHidden";

type Props<
  Item extends ListItemKey = ListItemKey
> = SharedAutoCompleteProps<Item> & {
  onInputValueChange: (changes: Partial<UseComboboxState<Item | null>>) => void;
  describedBy?: string;
  isLoading: boolean;
  items: Item[];
};

function InternalAutoComplete<Item extends ListItemKey = ListItemKey>(
  props: Props<Item>
) {
  const theme = useTheme();
  const {
    label,
    placeholder,
    items,
    listItem: ListItem,
    onInputValueChange,
    onBlur,
    onFocus,
    itemToString: itemToStringFn,
    isLoading,
    itemsFooter: Footer,
    describedBy,
    onChange,
    innerRef,
    __internal__open,
    __internal__highlightedIndex,
    __internal__loading,
    __internal__focus,
    value,
  } = props;

  const itemToString = (item: Item | null): string =>
    itemToStringFn ? itemToStringFn?.(item) : item ? String(item) : "";

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
  } = useCombobox<Item | null>({
    items: items || [],
    defaultSelectedItem: value,
    onInputValueChange,
    onSelectedItemChange: (changed) => {
      onChange?.(changed.selectedItem);
    },
    itemToString: (item) =>
      itemToStringFn ? itemToStringFn?.(item) : item ? String(item) : "",
  });

  const onClear = () => {
    selectItem(null);
    closeMenu();
  };

  const menuIsOpen = isOpen || (__internal__open ?? false);
  const showClearIcon = (menuIsOpen && items.length > 0) || inputValue !== "";
  const showMagnifier = !showClearIcon;
  const loading = !!isLoading || __internal__loading;

  const renderListItem = (record: Item) => {
    if (ListItem) {
      return <ListItem inputValue={inputValue} item={record} />;
    }
    return itemToString ? itemToString(record) : record;
  };

  return (
    <div css={theme.autoComplete.getCSS({ targetElement: "container" })}>
      <div {...getComboboxProps()}>
        <InternalInput
          {...getInputProps({ refKey: "innerRef", ref: innerRef })}
          label={label}
          describedBy={describedBy}
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
          isOpen: showClearIcon,
        })}
      >
        {showClearIcon && (
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
            {Footer && <Footer />}
          </>
        )}
      </ul>
    </div>
  );
}

export default InternalAutoComplete;
