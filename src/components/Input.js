import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import Field from "./internal/Field";
import useContainer from "../hooks/useContainer";
import useTheme from "../hooks/useTheme";
import useValidation from "../hooks/useValidation";

const TYPES = ["text", "number"];

export const COLORS = ["grey.t05", "white"];

export const DEFAULT_PROPS = {
  color: "grey.t05",
  type: "text",
  isOptional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ isOptional }) => !isOptional,
      validator: (value, { isTouched }) => {
        if (!isTouched) {
          return null;
        }

        if (value.trim() === "") {
          return "Required";
        }

        return null;
      }
    }
  ]
};

function Input(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    type,
    label,
    isOptional,
    placeholder,
    helpText,
    onFocus,
    onBlur,
    isDisabled,
    data,
    onChange,
    __internal__focused
  } = props;
  const theme = useTheme();
  const { inputColor } = useContainer();
  const color =
    !COLORS.includes(_props.color) && inputColor ? inputColor : props.color;
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const [inputId] = useState(() => `input-${nanoid()}`);
  const [auxId] = useState(() => `input-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState(false);
  const { value, errors } = data;
  const validate = useValidation({
    props,
    extraData: {
      isTouched
    }
  });

  return (
    <Field
      isOptional={isOptional}
      isDisabled={isDisabled}
      label={label}
      labelFor={inputId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
    >
      <input
        css={{
          ...theme.input,
          ...theme[`input.${colorStr}`],
          ":focus": theme["input:focus"],
          ...(__internal__focused && theme["input:focus"]),
          ":hover": theme["input:hover"],
          ...(type === "number" && {
            "::-webkit-inner-spin-button, ::-webkit-outer-spin-button":
              theme["input.webkitSpinButton"]
          })
        }}
        id={label ? inputId : null}
        type={type}
        placeholder={placeholder}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck="false"
        aria-invalid={errors ? "true" : null}
        aria-describedby={helpText || errors ? auxId : null}
        disabled={isDisabled}
        onFocus={() => {
          setIsTouched(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          validate();
          onBlur && onBlur();
        }}
        value={value}
        onChange={e => {
          onChange({
            ...data,
            value: e.target.value
          });
        }}
      />
    </Field>
  );
}

Input.propTypes = {
  color: PropTypes.oneOf(COLORS),
  type: PropTypes.oneOf(TYPES),
  label: PropTypes.string,
  isOptional: PropTypes.bool,
  placeholder: PropTypes.string,
  helpText: PropTypes.node,
  isDisabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.func,
      validator: PropTypes.func.isRequired
    })
  ),
  data: PropTypes.shape({
    value: PropTypes.string.isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  __internal__focused: PropTypes.bool
};

export default Input;
