import React from "react";
import PropTypes from "prop-types";
import { Icon, Text } from "..";
import useTheme from "../../hooks/useTheme";
import { responsiveMaxHeightType } from "../../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import { responsiveSize } from "../../utils/css";

const COLORS = ["grey.t05", "white"];

function DropdownDefaultPlaceholder() {
  return <Text>Please select</Text>;
}

const DEFAULT_PROPS = {
  color: "grey.t05",
  placeholderComponent: DropdownDefaultPlaceholder,
  disabled: false,
  isValid: true,
  maxHeight: "600",
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
    placeholderComponent: PlaceholderComponent,
    optionComponent: OptionComponent,
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
  const dropdownOptionsCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    maxHeight: responsiveSize("maxHeight"),
  });

  return (
    <div css={theme.dropdownContainer}>
      <button
        css={{
          ...theme.dropdownButton,
          ...theme[`dropdownButton.${colorStr}`],
          ...(!selectedOption && theme.dropdownButtonPlaceholder),
          ...(__internal__focus && theme.focusStyles.__keyboardFocus),
          // See: https://stackoverflow.com/a/199319/247243
          "::-moz-focus-inner": {
            border: 0,
          },
        }}
        type="button"
        name={name}
        data-parent-name={parentName ?? name}
        {...toggleButtonProps}
      >
        <div css={theme.dropdownButtonContent}>
          {selectedOption ? (
            <OptionComponent {...selectedOption} />
          ) : (
            <PlaceholderComponent />
          )}
        </div>
        <div css={theme.dropdownButtonChevron}>
          <Icon name="triangle-down" color="black" />
        </div>
      </button>
      <ul
        css={{
          ...theme.dropdownOptions,
          ":focus": theme["dropdownOptions:focus"],
          ...dropdownOptionsCSS,
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
              <OptionComponent {...option} />
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
  PlaceholderComponent: PropTypes.func,
  optionComponent: PropTypes.func.isRequired,
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
  ...responsiveMaxHeightType,
  __internal__focus: PropTypes.bool,
  __internal__open: PropTypes.bool,
  __internal__highlightedIndex: PropTypes.number,
};

export default InternalDropdown;
