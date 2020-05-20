import React from "react";
import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import useBackground from "../../hooks/useBackground";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import VisuallyHidden from "../VisuallyHidden";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  disabled: false,
  __internal__keyboardFocus: false,
};

InternalCheckbox.COLORS = COLORS;
InternalCheckbox.DEFAULT_PROPS = DEFAULT_PROPS;

function CheckboxIcon({ color, isChecked }) {
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const rectResponsiveCSS = useResponsivePropsCSS(
    {},
    {},
    {
      color: (propsAtBreakpoint, theme, bp) => {
        const labelColor = color ?? inputColorMap[bp];
        const fill =
          labelColor === "grey.t05" || isChecked
            ? "white"
            : "secondary.lightBlue.t25";

        return {
          fill: theme.getColor(fill),
        };
      },
    }
  );

  return (
    <svg
      css={theme.checkboxIcon}
      viewBox="0 0 100 100"
      focusable="false"
      aria-hidden="true"
    >
      <rect css={rectResponsiveCSS} width="100" height="100" rx="16" />
      {isChecked && (
        <path
          css={theme.checkboxIconMark}
          d="M21 51 l22 18 l35 -39"
          fill="transparent"
          strokeWidth="14"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}
    </svg>
  );
}

CheckboxIcon.propTypes = {
  color: PropTypes.oneOf(COLORS),
  isChecked: PropTypes.bool.isRequired,
};

function InternalCheckbox(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    name,
    parentName,
    inputId,
    color,
    disabled,
    isValid,
    labelledBy,
    describedBy,
    onFocus,
    onBlur,
    value,
    onChange,
    onMouseDown,
    children,
    __internal__keyboardFocus,
  } = props;
  const theme = useTheme();
  const { inputColorMap } = useBackground();
  const labelResponsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    color: (propsAtBreakpoint, theme, bp) => {
      return {
        backgroundColor: theme.getColor(_props.color ?? inputColorMap[bp]),
      };
    },
  });

  return (
    <div
      css={theme.checkboxLabelContainer}
      role="checkbox"
      aria-invalid={isValid ? null : "true"}
      aria-checked={value}
      aria-labelledby={labelledBy}
      aria-describedby={describedBy}
    >
      <VisuallyHidden>
        <input
          css={{
            ...theme.checkboxInput,
            ":checked + label": theme["checkboxLabel.checked"],
          }}
          type="checkbox"
          id={inputId}
          name={name}
          data-parent-name={parentName}
          checked={value}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={onChange}
        />
      </VisuallyHidden>
      <label
        css={{
          ...theme.checkboxLabel,
          ...labelResponsiveCSS,
          ...(__internal__keyboardFocus &&
            theme.focusStyles.__keyboardFocusAdjacentLabel),
        }}
        htmlFor={inputId}
        onMouseDown={onMouseDown}
      >
        <CheckboxIcon color={color} isChecked={value} />
        <span /* This span is needed so that we could mix text and <Link>. Without it, the white space between them would be ignored. */
        >
          {children}
        </span>
      </label>
    </div>
  );
}

InternalCheckbox.propTypes = {
  name: PropTypes.string.isRequired,
  parentName: PropTypes.string,
  inputId: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS),
  disabled: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  labelledBy: PropTypes.string,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  onMouseDown: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  __internal__keyboardFocus: PropTypes.bool,
};

export default InternalCheckbox;
