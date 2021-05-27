import React, { useState, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";
import useField from "../../hooks/internal/useField";
import { mergeProps } from "../../utils/component";
import Field from "../internal/Field";
import InternalCheckbox from "../internal/InternalCheckbox";
import { defaultCheckboxProps } from "./defaultCheckboxProps";

const { COLORS } = InternalCheckbox;

const DEFAULT_PROPS = {
  ...defaultCheckboxProps,
  color: InternalCheckbox.DEFAULT_PROPS.color,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Must be checked";
    }

    return null;
  },
};

Checkbox.COLORS = COLORS;
Checkbox.DEFAULT_PROPS = DEFAULT_PROPS;

function Checkbox(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      hideLabel: (hideLabel) => typeof hideLabel === "boolean",
      color: (color) => COLORS.includes(color),
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
    }
  );
  const {
    name,
    label,
    hideLabel,
    helpText,
    disabled,
    optional,
    validate,
    validateData,
    onChange: onChangeProp,
    children,
    testId,
    __internal__keyboardFocus,
  } = mergedProps;
  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [inputId] = useState(() => `checkbox-${nanoid()}`);
  const [auxId] = useState(() => `checkbox-aux-${nanoid()}`);
  const isEmpty = useCallback((value) => value === false, []);
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
    onMouseDown,
  } = useField("Checkbox", {
    name,
    disabled,
    optional,
    validate,
    data,
  });
  const onChange = useCallback(
    (event) => {
      fieldOnChange(event);
      onChangeProp && onChangeProp({ isChecked: event.target.checked });
    },
    [fieldOnChange, onChangeProp]
  );

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      hideLabel={hideLabel}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <InternalCheckbox
        name={name}
        inputId={inputId}
        // eslint-disable-next-line react/prop-types
        color={props.color}
        disabled={disabled}
        isValid={!hasErrors}
        labelledBy={label ? labelId : null}
        describedBy={helpText || hasErrors ? auxId : null}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        value={value}
        onChange={onChange}
        __internal__keyboardFocus={__internal__keyboardFocus}
      >
        {children}
      </InternalCheckbox>
    </Field>
  );
}

export default Checkbox;
