import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useTheme from "../hooks/useTheme";
import useBackground from "../hooks/useBackground";
import useValidation from "../hooks/useValidation";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";

const TYPES = ["text", "number"];
const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  type: "text",
  optional: false,
  disabled: false,
  pasteAllowed: true,
  validation: [
    {
      condition: ({ optional }) => !optional,
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

function Input(props) {
  const theme = useTheme();
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    type: type => TYPES.includes(type),
    optional: optional => typeof optional === "boolean",
    disabled: disabled => typeof disabled === "boolean",
    pasteAllowed: pasteAllowed => typeof pasteAllowed === "boolean"
  });
  const {
    color,
    type,
    label,
    optional,
    placeholder,
    helpText,
    onFocus,
    onBlur,
    disabled,
    pasteAllowed,
    data,
    onChange,
    testId,
    __internal__focus
  } = mergedProps;
  const colorStr = color === DEFAULT_PROPS.color ? "default" : color;
  const [inputId] = useState(() => `input-${nanoid()}`);
  const [auxId] = useState(() => `input-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState(false);
  const { value, errors } = data;
  const validate = useValidation({
    props: mergedProps,
    extraData: {
      isTouched
    }
  });

  return (
    <Field
      optional={optional}
      disabled={disabled}
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
        disabled={disabled}
        onFocus={() => {
          setIsTouched(true);
          onFocus && onFocus();
        }}
        onBlur={() => {
          validate();
          onBlur && onBlur();
        }}
        onPaste={e => {
          if (!pasteAllowed) {
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
  optional: PropTypes.bool,
  placeholder: PropTypes.string,
  helpText: PropTypes.node,
  disabled: PropTypes.bool,
  pasteAllowed: PropTypes.bool,
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
