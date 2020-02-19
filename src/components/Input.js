import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useForm from "../hooks/internal/useForm";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalInput from "./internal/InternalInput";

const { TYPES, COLORS } = InternalInput;

const DEFAULT_PROPS = {
  color: InternalInput.DEFAULT_PROPS.color,
  type: InternalInput.DEFAULT_PROPS.type,
  disabled: false,
  pasteAllowed: true,
  optional: false,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Required";
    }

    return null;
  }
};

Input.TYPES = TYPES;
Input.COLORS = COLORS;
Input.DEFAULT_PROPS = DEFAULT_PROPS;

function Input(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    type: type => TYPES.includes(type),
    disabled: disabled => typeof disabled === "boolean",
    pasteAllowed: pasteAllowed => typeof pasteAllowed === "boolean",
    optional: optional => typeof optional === "boolean"
  });
  const {
    name,
    color,
    type,
    label,
    placeholder,
    helpText,
    disabled,
    pasteAllowed,
    optional,
    validate,
    testId,
    __internal__focus
  } = mergedProps;
  const [inputId] = useState(() => `input-${nanoid()}`);
  const [auxId] = useState(() => `input-aux-${nanoid()}`);
  const {
    state,
    onFocus,
    onBlur,
    onChange,
    registerField,
    unregisterField
  } = useForm();
  const value = state.values[name];
  const errors = state.errors[name];
  const hasErrors = Array.isArray(errors) && errors.length > 0;
  const isEmpty = useCallback(value => value.trim() === "", []);

  useEffect(() => {
    registerField(name, {
      optional,
      validate,
      data: {
        isEmpty
      }
    });

    return () => {
      unregisterField(name);
    };
  }, [name, optional, validate, isEmpty, registerField, unregisterField]);

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
      <InternalInput
        id={label ? inputId : null}
        name={name}
        type={type}
        placeholder={placeholder}
        color={color}
        disabled={disabled}
        pasteAllowed={pasteAllowed}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : null}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        __internal__focus={__internal__focus}
      />
    </Field>
  );
}

Input.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS),
  type: PropTypes.oneOf(TYPES),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helpText: PropTypes.node,
  disabled: PropTypes.bool,
  pasteAllowed: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool
};

export default Input;
