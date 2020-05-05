import React from "react";
import PropTypes from "prop-types";
import { Icon } from "..";
import useTheme from "../../hooks/useTheme";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  renderPlaceholder: () => "Please select",
  disabled: false,
  isValid: true,
  __internal__focus: false,
  __internal__open: false,
};

InternalDropdown.COLORS = COLORS;
InternalDropdown.DEFAULT_PROPS = DEFAULT_PROPS;

function InternalDropdown(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    name,
    parentName,
    color,
    renderPlaceholder,
    renderOption,
    options,
    selectedOption,
    isOpen,
    toggleButtonProps,
    getMenuProps,
    getItemProps,
    highlightedIndex,
    onFocus,
    __internal__focus,
    __internal__open,
    __internal__highlightedIndex,
  } = props;
  const theme = useTheme();
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const menuProps = getMenuProps({
    "data-parent-name": parentName ?? name,
    onFocus,
  });

  return (
    <div css={theme.dropdownContainer}>
      <button
        css={{
          ...theme.dropdownButton,
          ...theme[`dropdownButton.${colorStr}`],
          ...(!selectedOption && theme.dropdownButtonPlaceholder),
          ...(__internal__focus && theme.focusStyles.__keyboardFocus),
        }}
        type="button"
        name={name}
        data-parent-name={parentName ?? name}
        {...toggleButtonProps}
      >
        <div css={theme.dropdownButtonContent}>
          {selectedOption ? renderOption(selectedOption) : renderPlaceholder()}
        </div>
        <div
          css={{
            ...theme.dropdownButtonChevron,
            ...((isOpen || __internal__open) &&
              theme["dropdownButtonChevron.open"]),
          }}
        >
          <Icon name="chevron-down" color="black" />
        </div>
      </button>
      <ul
        css={{
          ...theme.dropdownOptions,
          ":focus": theme["dropdownOptions:focus"],
        }}
        {...menuProps}
      >
        {(isOpen || __internal__open) &&
          options.map((option, index) => (
            <li
              css={{
                ...theme.dropdownOption,
                ...((__internal__highlightedIndex ?? highlightedIndex) ===
                  index && theme.dropdownOptionHighlighted),
              }}
              {...getItemProps({ item: option, index })}
              key={index}
            >
              {renderOption(option)}
            </li>
          ))}
      </ul>
    </div>
  );
}

InternalDropdown.propTypes = {
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string, // While Dropdown doesn't pass a parentName, a composite component that contains an InternalDropdown would.
  color: PropTypes.oneOf(COLORS),
  renderPlaceholder: PropTypes.func,
  renderOption: PropTypes.func.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      data: PropTypes.object.isRequired,
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedOption: PropTypes.shape({
    data: PropTypes.object.isRequired,
    value: PropTypes.string.isRequired,
  }),
  isOpen: PropTypes.bool.isRequired,
  toggleButtonProps: PropTypes.object.isRequired,
  getMenuProps: PropTypes.func.isRequired,
  getItemProps: PropTypes.func.isRequired,
  highlightedIndex: PropTypes.number.isRequired,
  onFocus: PropTypes.func.isRequired,
  __internal__focus: PropTypes.bool,
  __internal__open: PropTypes.bool,
  __internal__highlightedIndex: PropTypes.number,
};

export default InternalDropdown;
