import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useField from "../hooks/internal/useField";
import { mergeProps, areOptionsValid } from "../utils/component";
import Field from "./internal/Field";
import InternalSelect from "./internal/InternalSelect";

const { COLORS } = InternalSelect;

function isOptionSelected(options, value) {
  return options.findIndex((option) => option.value === value) > -1;
}

const DEFAULT_PROPS = {
  color: InternalSelect.DEFAULT_PROPS.color,
  placeholder: InternalSelect.DEFAULT_PROPS.placeholder,
  fullWidth: InternalSelect.DEFAULT_PROPS.fullWidth,
  disabled: false,
  optional: false,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  },
};

Select.COLORS = COLORS;
Select.DEFAULT_PROPS = DEFAULT_PROPS;

function Select(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      color: (color) => COLORS.includes(color),
      placeholder: (placeholder) => typeof placeholder === "string",
      fullWidth: (fullWidth) => typeof fullWidth === "boolean",
      helpText: (helpText) => typeof helpText === "string",
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
      options: (options) => areOptionsValid(options),
      onChange: (onChange) => typeof onChange === "function",
    }
  );
  const {
    name,
    label,
    placeholder,
    options,
    fullWidth,
    helpText,
    disabled,
    optional,
    validate,
    validateData,
    onChange: propsOnChange,
    testId,
    __internal__focus,
  } = mergedProps;

  if (!options) {
    throw new Error(
      `Select options should have the following format: [{ label: "option-label", value: "option-value" }, ...]`
    );
  }

  const [selectId] = useState(() => `select-${nanoid()}`);
  const [auxId] = useState(() => `select-aux-${nanoid()}`);
  const isEmpty = useCallback(
    (value) => isOptionSelected(options, value) === false,
    [options]
  );
  const data = useMemo(
    () => ({
      isEmpty,
      ...(validateData && { data: validateData }),
    }),
    [isEmpty, validateData]
  );
  const {
    value,
    errors,
    hasErrors,
    onFocus,
    onBlur,
    onChange: fieldOnChange,
  } = useField("Select", {
    name,
    disabled,
    optional,
    validate,
    data,
  });
  const onChange = (event) => {
    fieldOnChange(event);

    const selectedValue = event.target.value;
    const selectedOption = options.find(({ value }) => value === selectedValue);

    propsOnChange && propsOnChange({ selectedOption });
  };

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
        color={props.color}
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
      value: PropTypes.string.isRequired,
    })
  ).isRequired,
  fullWidth: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  onChange: PropTypes.func,
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool,
};

export default Select;
