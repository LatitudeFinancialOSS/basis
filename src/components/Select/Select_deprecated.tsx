import React, { useState, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";
import useField from "../../hooks/internal/useField";
import { mergeProps, areOptionsValid } from "../../utils/component";
import Field from "../internal/Field";
import InternalSelect from "../internal/InternalSelect";
import { DeprecatedSelectProps } from "./types";
import { defaultSelectProps } from "./defaultSelectProps";

const { COLORS } = InternalSelect;

// @ts-ignore
function isOptionSelected(options, value) {
  // @ts-ignore
  return options.findIndex((option) => option.value === value) > -1;
}

const DEFAULT_PROPS = {
  ...defaultSelectProps,
  color: InternalSelect.DEFAULT_PROPS.color,
  // @ts-ignore
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  },
};

Select.COLORS = COLORS;
Select.DEFAULT_PROPS = DEFAULT_PROPS;

function Select(props: DeprecatedSelectProps) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      // @ts-ignore
      color: (color) => COLORS.includes(color),
      // @ts-ignore
      placeholder: (placeholder) => typeof placeholder === "string",
      // @ts-ignore
      fullWidth: (fullWidth) => typeof fullWidth === "boolean",
      // @ts-ignore
      helpText: (helpText) => typeof helpText === "string",
      // @ts-ignore
      disabled: (disabled) => typeof disabled === "boolean",
      // @ts-ignore
      optional: (optional) => typeof optional === "boolean",
      // @ts-ignore
      options: (options) => areOptionsValid(options),
      // @ts-ignore
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
  // @ts-ignore
  const onChange = (event) => {
    fieldOnChange(event);

    const selectedValue = event.target.value;
    // @ts-ignore
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
