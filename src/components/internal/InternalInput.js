import React, { useCallback } from "react";
import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";

const TYPES = ["text", "number"];
const DEFAULT_TYPE = "text";
const COLORS = ["grey.t05", "white"];
const DEFAULT_COLOR = "grey.t05";

InternalInput.TYPES = TYPES;
InternalInput.DEFAULT_TYPE = DEFAULT_TYPE;
InternalInput.COLORS = COLORS;
InternalInput.DEFAULT_COLOR = DEFAULT_COLOR;

function InternalInput({
  name,
  id,
  placeholder,
  type = DEFAULT_TYPE,
  color = DEFAULT_COLOR,
  disabled = false,
  pasteAllowed = true,
  isValid = true,
  describedBy,
  onFocus,
  onBlur,
  value,
  onChange,
  __internal__focus = false
}) {
  const theme = useTheme();
  const colorStr = color === DEFAULT_COLOR ? "default" : color;
  const onPaste = useCallback(
    event => {
      if (!pasteAllowed) {
        event.preventDefault();
      }
    },
    [pasteAllowed]
  );

  return (
    <input
      css={{
        ...theme.input,
        ...theme[`input.${colorStr}`],
        ":focus": theme["input:focus"],
        ...(__internal__focus && theme["input:focus"]),
        ":hover": theme["input:hover"],
        ...(type === "number" && {
          "::-webkit-inner-spin-button, ::-webkit-outer-spin-button":
            theme["input.webkitSpinButton"]
        })
      }}
      id={id}
      name={name}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
      onPaste={onPaste}
      autoComplete="off"
      autoCorrect="off"
      autoCapitalize="off"
      spellCheck="false"
      aria-invalid={isValid ? null : "true"}
      aria-describedby={describedBy}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value}
      onChange={onChange}
    />
  );
}

InternalInput.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(TYPES),
  color: PropTypes.oneOf(COLORS),
  disabled: PropTypes.bool,
  pasteAllowed: PropTypes.bool,
  isValid: PropTypes.bool,
  describedBy: PropTypes.string,
  onFocus: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  __internal__focus: PropTypes.bool
};

export default InternalInput;
