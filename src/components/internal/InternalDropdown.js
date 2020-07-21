import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
import Text from "../Text";
import useBackground, {
  BackgroundProvider,
  mapResponsiveValues,
} from "../../hooks/useBackground";
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
  const { inputColorMap } = useBackground();
  const colorMap = mapResponsiveValues(
    inputColorMap,
    (inputColor) => {
      return _props.color ?? inputColor;
    },
    theme
  );
  const buttonCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      return theme.dropdown.getCSS({
        targetElement: "button",
        color: colorMap[bp],
        isPlaceholder: !selectedOption,
        __internal__focus,
      });
    },
  });
  const optionsCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    maxHeight: responsiveSize("maxHeight"),
  });
  const menuProps = getMenuProps({
    "data-parent-name": parentName ?? name,
    onFocus,
  });

  return (
    <div css={theme.dropdown.getCSS({ targetElement: "container" })}>
      <button
        css={buttonCSS}
        type="button"
        name={name}
        data-parent-name={parentName ?? name}
        {...toggleButtonProps}
      >
        <BackgroundProvider value={colorMap}>
          <div css={theme.dropdown.getCSS({ targetElement: "buttonContent" })}>
            {selectedOption ? (
              <OptionComponent {...selectedOption} />
            ) : (
              <PlaceholderComponent />
            )}
          </div>
          <div css={theme.dropdown.getCSS({ targetElement: "buttonChevron" })}>
            <Icon name="triangle-down" color="black" />
          </div>
        </BackgroundProvider>
      </button>
      <ul
        css={{
          ...theme.dropdown.getCSS({ targetElement: "options" }),
          ...optionsCSS,
        }}
        {...menuProps}
      >
        <BackgroundProvider value="white">
          {(isOpen || __internal__open) &&
            options.map((option, index) => (
              <li
                css={theme.dropdown.getCSS({
                  targetElement: "option",
                  isHighlighted:
                    (__internal__highlightedIndex ?? highlightedIndex) ===
                    index,
                })}
                {...getItemProps({ item: option, index })}
                key={index}
              >
                <OptionComponent {...option} />
              </li>
            ))}
        </BackgroundProvider>
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
