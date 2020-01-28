import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import Field from "./internal/Field";
import useContainer from "../hooks/useContainer";
import useTheme from "../hooks/useTheme";
import useValidation from "../hooks/useValidation";

const TYPES = ["text", "number"];
const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  type: "text",
  isOptional: false,
  isDisabled: false,
  isPasteAllowed: true,
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

Input.TYPES = TYPES;
Input.COLORS = COLORS;
Input.DEFAULT_PROPS = DEFAULT_PROPS;

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
    isPasteAllowed,
    data,
    onChange,
    testId,
    __internal__focus
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
      testId={testId}
    >
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
        onPaste={e => {
          if (!isPasteAllowed) {
            e.preventDefault();
          }
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
  isPasteAllowed: PropTypes.bool,
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
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool
};

export default Input;
