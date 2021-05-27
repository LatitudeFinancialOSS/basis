import React, { useState } from "react";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import InternalSelect from "../internal/InternalSelect";
import { InternalSelectProps } from "./types";
import { useMergedProps } from "../../hooks/useMergedProps";
import { defaultSelectProps } from "./defaultSelectProps";

function Select(props: InternalSelectProps) {
  const mergedProps = useMergedProps(props, defaultSelectProps);
  const {
    value,
    innerRef,
    label,
    placeholder,
    options,
    fullWidth,
    helpText,
    disabled,
    optional,
    onChange,
    onFocus,
    onBlur,
    error,
    testId,
    color,
    __internal__focus,
  } = mergedProps;

  if (!options) {
    throw new Error(
      `Select options should have the following format: [{ label: "option-label", value: "option-value" }, ...]`
    );
  }

  const [selectId] = useState(() => `select-${nanoid()}`);
  const [auxId] = useState(() => `select-aux-${nanoid()}`);

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  return (
    <Field
      fullWidth={fullWidth}
      optional={optional}
      disabled={disabled}
      label={label}
      labelFor={selectId}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
    >
      <InternalSelect
        testId={testId}
        innerRef={innerRef}
        id={selectId}
        color={color}
        placeholder={placeholder}
        options={options}
        fullWidth={fullWidth}
        optional={optional}
        disabled={disabled}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        value={value}
        onChange={onChange}
        __internal__focus={__internal__focus}
      />
    </Field>
  );
}

export default Select;
