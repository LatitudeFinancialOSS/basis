import React, { useState } from "react";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import InternalCheckbox from "../internal/InternalCheckbox";
import { defaultCheckboxProps } from "./defaultCheckboxProps";
import { InternalCheckboxProps } from "./types";
import { useMergedProps } from "../../hooks/useMergedProps";

function Checkbox(props: InternalCheckboxProps) {
  const mergedProps = useMergedProps(props, defaultCheckboxProps);
  const {
    label,
    value,
    hideLabel,
    innerRef,
    helpText,
    disabled,
    optional,
    onChange,
    onFocus,
    onBlur,
    onMouseDown,
    children,
    testId,
    error,
    __internal__keyboardFocus,
  } = mergedProps;
  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [inputId] = useState(() => `checkbox-${nanoid()}`);
  const [auxId] = useState(() => `checkbox-aux-${nanoid()}`);

  const onCheckboxChange: React.ChangeEventHandler<HTMLInputElement> = (
    event
  ) => {
    onChange?.(event.target.checked);
  };

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      hideLabel={hideLabel}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
    >
      <InternalCheckbox
        innerRef={innerRef}
        inputId={inputId}
        testId={testId}
        color={props.color}
        disabled={disabled}
        isValid={!hasErrors}
        labelledBy={label ? labelId : undefined}
        describedBy={helpText || hasErrors ? auxId : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        value={value}
        onChange={onCheckboxChange}
        __internal__keyboardFocus={__internal__keyboardFocus}
      >
        {children}
      </InternalCheckbox>
    </Field>
  );
}

export default Checkbox;
