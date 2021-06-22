import React, { useState } from "react";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import InternalInput from "../internal/InternalInput";
import { InternalInputProps } from "./types";
import { useMergedProps } from "../../hooks/useMergedProps";
import { defaultInputProps } from "./defaultInputProps";

const Input = (props: InternalInputProps) => {
  const mergedProps = useMergedProps(props, defaultInputProps);
  const {
    type,
    variant,
    prefix,
    suffix,
    maxLength,
    autoComplete,
    label,
    placeholder,
    helpText,
    innerRef,
    disabled,
    pasteAllowed,
    optional,
    onChange,
    onBlur,
    onFocus,
    testId,
    value,
    error,
    id,
    onKeyDown,
    __internal__focus,
  } = mergedProps;

  const [inputId] = useState(() => id ?? `input-${nanoid()}`);
  const [auxId] = useState(() => `input-aux-${nanoid()}`);

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelFor={inputId}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
    >
      <InternalInput
        id={label ? inputId : undefined}
        testId={testId}
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
        describedBy={helpText || hasErrors ? auxId : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        __internal__focus={__internal__focus}
      />
    </Field>
  );
};

export default Input;
