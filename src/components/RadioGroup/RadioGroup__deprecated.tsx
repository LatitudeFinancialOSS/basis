import React, { useState, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";
import useField from "../../hooks/internal/useField";
import { mergeProps, areOptionsValid } from "../../utils/component";
import Field from "../internal/Field";
import InternalRadioGroup from "../internal/InternalRadioGroup";
import { DeprecatedRadioGroupProps, RadioOption, RadioOptions } from "./types";
import { defaultRadioGroupProps } from "./defaultRadioGroupProps";

const { COLORS } = InternalRadioGroup;

function isOptionSelected(options: RadioOptions, value: string) {
  return (
    options.findIndex((option: RadioOption) => option.value === value) > -1
  );
}

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

function RadioGroup(props: DeprecatedRadioGroupProps) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      // @ts-ignore
      color: (color) => COLORS.includes(color),
      // @ts-ignore
      disabled: (disabled) => typeof disabled === "boolean",
      // @ts-ignore
      optional: (optional) => typeof optional === "boolean",
      // @ts-ignore
      options: (options) => areOptionsValid(options),
    }
  );
  const {
    name,
    label,
    options,
    columns,
    helpText,
    disabled,
    optional,
    validate,
    validateData,
    onChange: onChangeProp,
    testId,
  } = mergedProps;

  if (!options) {
    throw new Error("RadioGroup options are invalid");
  }

  const [labelId] = useState(() => `radio-group-label-${nanoid()}`);
  const [auxId] = useState(() => `radio-group-aux-${nanoid()}`);
  // @ts-ignore
  const cols = options.some((option) => option.description)
    ? 1
    : columns === undefined
    ? options.length
    : columns;
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
    onMouseDown,
  } = useField("RadioGroup", {
    name,
    disabled,
    optional,
    validate,
    data,
  });
  const onChange = useCallback(
    (event) => {
      fieldOnChange(event);

      const selectedValue = event.target.value;
      const selectedOption = options.find(
        // @ts-ignore
        (option) => option.value === selectedValue
      );

      onChangeProp && onChangeProp({ selectedOption });
    },
    [fieldOnChange, onChangeProp, options]
  );

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <InternalRadioGroup
        name={name}
        labelId={labelId}
        options={options}
        columns={cols}
        color={props.color}
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
