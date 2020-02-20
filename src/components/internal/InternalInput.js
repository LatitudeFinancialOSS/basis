import React, { useCallback } from "react";
import PropTypes from "prop-types";
import useTheme from "../../hooks/useTheme";

const TYPES = ["text", "number"];
const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  type: "text",
  color: "grey.t05",
  disabled: false,
  pasteAllowed: true,
  isValid: true,
  __internal__focus: false
};

InternalInput.TYPES = TYPES;
InternalInput.COLORS = COLORS;
InternalInput.DEFAULT_PROPS = DEFAULT_PROPS;

function InternalInput(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    name,
    id,
    placeholder,
    type,
    color,
    disabled,
    pasteAllowed,
    isValid,
    describedBy,
    onFocus,
    onBlur,
    value,
    onChange,
    __internal__focus
  } = props;
  const theme = useTheme();
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
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
