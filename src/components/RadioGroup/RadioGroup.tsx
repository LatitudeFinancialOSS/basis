import React, { useState } from "react";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import InternalRadioGroup from "../internal/InternalRadioGroup";
import { InternalRadioGroupProps } from "./types";

const { COLORS } = InternalRadioGroup;

const DEFAULT_PROPS = {
  color: InternalRadioGroup.DEFAULT_PROPS.color,
  disabled: false,
  optional: false,
  // @ts-ignore
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  },
};

RadioGroup.COLORS = COLORS;
RadioGroup.DEFAULT_PROPS = DEFAULT_PROPS;

function RadioGroup(props: InternalRadioGroupProps) {
  const {
    value,
    label,
    options,
    columns,
    helpText,
    innerRef,
    disabled = DEFAULT_PROPS.disabled,
    optional = DEFAULT_PROPS.optional,
    color = DEFAULT_PROPS.color,
    error = [],
    onChange,
    onFocus,
    onBlur,
    onMouseDown,
    testId,
  } = props;

  if (!options) {
    throw new Error("RadioGroup options are invalid");
  }

  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [auxId] = useState(() => `radio-group-aux-${nanoid()}`);

  const fieldErrors = Array.isArray(error) ? error : [error];
  const hasErrors = Array.isArray(error) ? error.length !== 0 : !!error;

  // @ts-ignore
  const cols = options.some((option) => option.description)
    ? 1
    : columns === undefined
    ? options.length
    : columns;

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
    >
      <InternalRadioGroup
        testId={testId}
        labelId={labelId}
        innerRef={innerRef}
        options={options}
        columns={cols}
        color={color}
        disabled={disabled}
        isValid={!hasErrors}
        describedBy={helpText || hasErrors ? auxId : undefined}
        onFocus={onFocus}
        onBlur={onBlur}
        onMouseDown={onMouseDown}
        value={value}
        onChange={onChange}
      />
    </Field>
  );
}

export default RadioGroup;
