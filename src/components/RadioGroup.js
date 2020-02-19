import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useForm from "../hooks/internal/useForm";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalRadioGroup from "./internal/InternalRadioGroup";

const { COLORS } = InternalRadioGroup;

function isOptionSelected(options, value) {
  return options.findIndex(option => option.value === value) > -1;
}

const DEFAULT_PROPS = {
  color: InternalRadioGroup.DEFAULT_PROPS.color,
  showCircles: true,
  disabled: false,
  optional: false,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  }
};

RadioGroup.COLORS = COLORS;
RadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

function RadioGroup(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    showCircles: showCircles => typeof showCircles === "boolean",
    disabled: disabled => typeof disabled === "boolean",
    optional: optional => typeof optional === "boolean"
  });
  const {
    name,
    label,
    options,
    columns,
    color,
    showCircles,
    helpText,
    disabled,
    optional,
    validate,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [auxId] = useState(() => `radio-group-aux-${nanoid()}`);
  const cols = columns === undefined ? options.length : columns;
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
  const isEmpty = useCallback(
    value => isOptionSelected(options, value) === false,
    [options]
  );

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
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <InternalRadioGroup
        name={name}
        labelId={labelId}
        auxId={auxId}
        options={options}
        columns={cols}
        color={color}
        showCircles={showCircles}
        disabled={disabled}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : null}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}

RadioGroup.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  columns: PropTypes.number,
  color: PropTypes.oneOf(COLORS),
  showCircles: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  testId: PropTypes.string
};

export default RadioGroup;
