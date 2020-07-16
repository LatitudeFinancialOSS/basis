import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "basis";
import { INTEGER_REGEX } from "./utils";

const VARIANTS = ["text", "numeric"];

function PlaygroundSettingsInput({
  value,
  onChange,
  isValid,
  variant = "text",
  maxLength,
  min,
  max,
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
    borderRadius: 2,
    boxShadow: `0 0 0px ${isValid ? "1px" : "2px"} ${
      isValid ? theme.getColor("grey.t65") : "red"
    }`,
    ":focus": {
      border: 0,
      boxShadow: isValid
        ? `0 0 0px 4px ${theme.getColor("secondary.lightBlue.t80")}`
        : null,
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
  const onUpDown = (e) => {
    if (
      (min == null && max == null) ||
      (e.key !== "ArrowUp" && e.key !== "ArrowDown")
    ) {
      return;
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
    }

    const trimmedValue = e.target.value.trim();

    if (INTEGER_REGEX.test(trimmedValue) === false) {
      return;
    }

    const intValue = Number(trimmedValue);
    const step = e.shiftKey ? 10 : 1;
    const newValue = e.key === "ArrowUp" ? intValue + step : intValue - step;

    if (
      (newValue < min && e.key === "ArrowDown") ||
      (newValue > max && e.key === "ArrowUp")
    ) {
      return;
    }

    onChange({
      target: {
        value: String(newValue),
      },
    });
  };

  return (
    <input
      css={inputCSS}
      type="text"
      {...numericProps}
      maxLength={maxLength}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      onKeyDown={onUpDown}
      aria-label={ariaLabel}
      aria-invalid={!isValid}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
    />
  );
}

PlaygroundSettingsInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  isValid: PropTypes.bool.isRequired,
  variant: PropTypes.oneOf(VARIANTS),
  maxLength: PropTypes.string,
  min: PropTypes.number,
  max: PropTypes.number,
  placeholder: PropTypes.string,
  ariaLabel: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default PlaygroundSettingsInput;
