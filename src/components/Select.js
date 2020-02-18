import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useForm from "../hooks/internal/useForm";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalSelect from "./internal/InternalSelect";

const { COLORS, DEFAULT_COLOR } = InternalSelect;

function isOptionSelected(options, value) {
  return options.findIndex(option => option.value === value) > -1;
}

const DEFAULT_PROPS = {
  color: DEFAULT_COLOR,
  placeholder: "Please select",
  fullWidth: true,
  optional: false,
  disabled: false,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  }
};

Select.COLORS = COLORS;
Select.DEFAULT_PROPS = DEFAULT_PROPS;

function Select(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    fullWidth: fullWidth => typeof fullWidth === "boolean",
    optional: optional => typeof optional === "boolean",
    disabled: disabled => typeof disabled === "boolean"
  });
  const {
    name,
    color,
    label,
    placeholder,
    options,
    fullWidth,
    optional,
    helpText,
    disabled,
    validate,
    testId,
    __internal__focus
  } = mergedProps;
  const [selectId] = useState(() => `select-${nanoid()}`);
  const [auxId] = useState(() => `select-aux-${nanoid()}`);
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
      isEmpty: value => isOptionSelected(options, value) === false
    });

    return () => {
      unregisterField(name);
    };
  }, [name, options, optional, validate, registerField, unregisterField]);

  return (
    <Field
      fullWidth={fullWidth}
      optional={optional}
      disabled={disabled}
      label={label}
      labelFor={selectId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <InternalSelect
        id={selectId}
        name={name}
        color={color}
        placeholder={placeholder}
        options={options}
        fullWidth={fullWidth}
        optional={optional}
        disabled={disabled}
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

Select.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS),
  placeholder: PropTypes.string,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.string.isRequired
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
  optional: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool
};

export default Select;
