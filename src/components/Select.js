import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useField from "../hooks/internal/useField";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalSelect from "./internal/InternalSelect";

const { COLORS } = InternalSelect;

function isOptionSelected(options, value) {
  return options.findIndex(option => option.value === value) > -1;
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
    placeholder: placeholder => typeof placeholder === "string",
    fullWidth: fullWidth => typeof fullWidth === "boolean",
    helpText: helpText => typeof helpText === "string",
    disabled: disabled => typeof disabled === "boolean",
    optional: optional => typeof optional === "boolean"
  });
  const {
    name,
    color,
    label,
    placeholder,
    options,
    fullWidth,
    helpText,
    disabled,
    optional,
    validate,
    testId,
    __internal__focus
  } = mergedProps;
  const [selectId] = useState(() => `select-${nanoid()}`);
  const [auxId] = useState(() => `select-aux-${nanoid()}`);
  const isEmpty = useCallback(
    value => isOptionSelected(options, value) === false,
    [options]
  );
  const data = useMemo(
    () => ({
      isEmpty
    }),
    [isEmpty]
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
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  testId: PropTypes.string,
  __internal__focus: PropTypes.bool
};

export default Select;
