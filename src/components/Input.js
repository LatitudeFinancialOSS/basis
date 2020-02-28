import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useField from "../hooks/internal/useField";
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
    min: min =>
      props.type === "number" &&
      (typeof min === "number" || typeof min === "string"),
    max: max =>
      props.type === "number" &&
      (typeof max === "number" || typeof max === "string"),
    step: step =>
      props.type === "number" &&
      (typeof step === "number" || typeof step === "string"),
    disabled: disabled => typeof disabled === "boolean",
    pasteAllowed: pasteAllowed => typeof pasteAllowed === "boolean",
    optional: optional => typeof optional === "boolean"
  });
  const {
    name,
    color,
    type,
    min,
    max,
    step,
    label,
    placeholder,
    helpText,
    disabled,
    pasteAllowed,
    optional,
    validate,
    validateData,
    testId,
    __internal__focus
  } = mergedProps;
  const [inputId] = useState(() => `input-${nanoid()}`);
  const [auxId] = useState(() => `input-aux-${nanoid()}`);
  const isEmpty = useCallback(value => value.trim() === "", []);
  const data = useMemo(
    () => ({
      isEmpty,
      ...(validateData && { data: validateData })
    }),
    [isEmpty, validateData]
  );
  const { value, errors, hasErrors, onFocus, onBlur, onChange } = useField({
    name,
    disabled,
    optional,
    validate,
    data
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
      <InternalInput
        id={label ? inputId : null}
        name={name}
        type={type}
        min={min}
        max={max}
        step={step}
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
  min: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  max: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  step: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  helpText: PropTypes.node,
  disabled: PropTypes.bool,
  pasteAllowed: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool
};

export default Input;
