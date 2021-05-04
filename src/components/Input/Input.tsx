import React, { useState } from "react";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import InternalInput from "../internal/InternalInput";
import { InternalInputProps } from "./types";

const Input = (props: InternalInputProps) => {
  const {
    type = InternalInput.DEFAULT_PROPS.type,
    variant = InternalInput.DEFAULT_PROPS.variant,
    prefix,
    suffix,
    maxLength,
    autoComplete,
    label,
    placeholder,
    helpText,
    innerRef,
    disabled = false,
    pasteAllowed = true,
    optional = false,
    onChange,
    onBlur,
    onFocus,
    testId,
    value,
    error = [],
    id,
    __internal__focus,
  } = props;

  const [inputId] = useState(() => id ?? `input-${nanoid()}`);
  const [auxId] = useState(() => `input-aux-${nanoid()}`);

  const fieldErrors = Array.isArray(error) ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length === 0 : !!error;

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelFor={inputId}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
      testId={testId}
    >
      <InternalInput
        id={label ? inputId : ""}
        innerRef={innerRef}
        type={type}
        variant={variant}
        prefix={prefix}
        suffix={suffix}
        maxLength={maxLength}
        autoComplete={autoComplete}
        placeholder={placeholder}
        color={props.color}
        disabled={disabled}
        pasteAllowed={pasteAllowed}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : ""}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        __internal__focus={__internal__focus}
      />
    </Field>
  );
};

export default Input;
