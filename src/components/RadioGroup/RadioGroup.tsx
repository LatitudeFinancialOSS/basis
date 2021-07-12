import React, { useMemo } from "react";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import InternalRadioGroup from "../internal/InternalRadioGroup";
import { InternalRadioGroupProps } from "./types";
import { useMergedProps } from "../../hooks/useMergedProps";
import { defaultRadioGroupProps } from "./defaultRadioGroupProps";

const { COLORS } = InternalRadioGroup;

const DEFAULT_PROPS = {
  ...defaultRadioGroupProps,
  color: InternalRadioGroup.DEFAULT_PROPS.color,
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
  const mergedProps = useMergedProps(props, defaultRadioGroupProps);
  const {
    name,
    value,
    label,
    options,
    columns,
    helpText,
    innerRef,
    disabled,
    optional,
    color = DEFAULT_PROPS.color,
    error,
    onChange,
    onFocus,
    onBlur,
    onMouseDown,
    testId,
  } = mergedProps;

  if (!options) {
    throw new Error("RadioGroup options are invalid");
  }

  const labelId = useMemo(() => `radio-group-label-${nanoid()}`, []);
  const auxId = useMemo(() => `radio-group-aux-${nanoid()}`, []);
  const radioName = useMemo(() => name || `radio-group-name-${nanoid()}`, [
    name,
  ]);

  const fieldErrors =
    Array.isArray(error) || error === undefined ? error : [error];
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
        name={radioName}
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
