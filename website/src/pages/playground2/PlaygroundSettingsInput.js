import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "basis";

const VARIANTS = ["text", "numeric"];

function PlaygroundSettingsInput({
  value,
  onChange,
  isValid,
  variant = "text",
  maxLength,
  placeholder,
  ariaLabel,
  width,
}) {
  const theme = useTheme();
  const inputCSS = {
    height: 20,
    width,
    padding: "0 4px",
    fontSize: "14px",
    fontWeight: "inherit",
    fontFamily: "inherit",
    border: 0,
    outline: `${isValid ? "1px" : "2px"} solid ${
      isValid ? theme.getColor("grey.t65") : "red"
    }`,
    ":focus": {
      border: 0,
      boxShadow: `0 0 0px ${theme.radii[1]} ${theme.colors.secondary.lightBlue.t80}`,
    },
  };
  const numericProps =
    variant === "numeric"
      ? {
          // See: https://technology.blog.gov.uk/2020/02/24/why-the-gov-uk-design-system-team-changed-the-input-type-for-numbers
          inputMode: "numeric",
          pattern: "[0-9]*",
        }
      : {};

  return (
    <input
      css={inputCSS}
      type="text"
      {...numericProps}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={ariaLabel}
      aria-invalid={!isValid}
    />
  );
}

PlaygroundSettingsInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(VARIANTS),
  maxLength: PropTypes.string,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default PlaygroundSettingsInput;
