import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useForm from "../hooks/internal/useForm";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalCheckbox from "./internal/InternalCheckbox";

const { COLORS } = InternalCheckbox;

const DEFAULT_PROPS = {
  color: "grey.t05",
  optional: false,
  disabled: false,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Must be checked";
    }

    return null;
  }
};

Checkbox.COLORS = COLORS;
Checkbox.DEFAULT_PROPS = DEFAULT_PROPS;

function Checkbox(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    optional: optional => typeof optional === "boolean",
    disabled: disabled => typeof disabled === "boolean"
  });
  const {
    name,
    label,
    color,
    optional,
    helpText,
    disabled,
    validate,
    children,
    testId,
    __internal__keyboardFocus
  } = mergedProps;
  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [inputId] = useState(() => `checkbox-${nanoid()}`);
  const [auxId] = useState(() => `checkbox-aux-${nanoid()}`);
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

  useEffect(() => {
    registerField(name, {
      optional,
      validate,
      isEmpty: value => value === false
    });

    return () => {
      unregisterField(name);
    };
  }, [name, optional, validate, registerField, unregisterField]);

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <InternalCheckbox
        name={name}
        inputId={inputId}
        color={color}
        disabled={disabled}
        isValid={!hasErrors}
        labelledBy={label ? labelId : null}
        describedBy={helpText || hasErrors ? auxId : null}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        __internal__keyboardFocus={__internal__keyboardFocus}
      >
        {children}
      </InternalCheckbox>
    </Field>
  );
}

Checkbox.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string,
  color: PropTypes.oneOf(COLORS),
  optional: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  children: PropTypes.node.isRequired,
  testId: PropTypes.string,
  __internal__keyboardFocus: PropTypes.bool
};

export default Checkbox;
