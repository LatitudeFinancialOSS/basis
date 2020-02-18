import React from "react";
import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";
import VisuallyHidden from "../VisuallyHidden";

const COLORS = ["grey.t05", "white"];

InternalCheckbox.COLORS = COLORS;

function CheckboxIcon({ color, isChecked }) {
  const theme = useTheme();

  return (
    <svg
      css={theme.checkboxIcon}
      viewBox="0 0 100 100"
      focusable="false"
      aria-hidden="true"
    >
      <rect
        css={theme[`checkboxIcon.${color}`]}
        width="100"
        height="100"
        rx="16"
      />
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
  color: PropTypes.oneOf(["white", "secondary.lightBlue.t30"]).isRequired,
  isChecked: PropTypes.bool.isRequired
};

function InternalCheckbox({
  name,
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
  children,
  __internal__keyboardFocus
}) {
  const theme = useTheme();

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
            ":focus-visible + label": theme["checkboxLabel.focus-visible"],
            ":checked + label": theme["checkboxLabel.checked"]
          }}
          type="checkbox"
          id={inputId}
          name={name}
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
          ...theme[`checkboxLabel.${color}`],
          ...(__internal__keyboardFocus && theme["checkboxLabel.focus-visible"])
        }}
        htmlFor={inputId}
      >
        <CheckboxIcon
          color={
            color === "grey.t05" || value ? "white" : "secondary.lightBlue.t30"
          }
          isChecked={value}
        />
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
  inputId: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS),
  disabled: PropTypes.bool,
  isValid: PropTypes.bool.isRequired,
  labelledBy: PropTypes.string,
  describedBy: PropTypes.string.isRequired,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  __internal__keyboardFocus: PropTypes.bool
};

export default InternalCheckbox;
