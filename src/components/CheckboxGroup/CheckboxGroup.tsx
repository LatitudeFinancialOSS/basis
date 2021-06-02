import React, { useCallback, useRef, useState } from "react";
import { nanoid } from "nanoid";
import InternalCheckbox from "../internal/InternalCheckbox";
import Field from "../internal/Field";
import Stack from "../Stack";
import {
  CheckboxOption,
  CheckboxOptions,
  InternalCheckboxGroupProps,
} from "./types";
import { useMergedProps } from "../../hooks/useMergedProps";
import { defaultCheckboxGroupProps } from "./defaultCheckboxGroupProps";
import mergeRefs from "../../utils/mergeRefs";

const getValues = (values: Record<string, boolean>, options: CheckboxOptions) =>
  options
    .map((val: CheckboxOption) => val.key)
    .reduce(
      (acc, curr) => ({ ...acc, [curr]: values[curr] ?? false }),
      {} as Record<string, boolean>
    );

type CheckboxGroupComponent = (props: InternalCheckboxGroupProps) => any;

const CheckboxGroup: CheckboxGroupComponent = (props) => {
  const mergedProps = useMergedProps(props, defaultCheckboxGroupProps);
  const {
    name,
    label,
    options,
    helpText,
    disabled,
    optional,
    innerRef = null,
    onChange: onChangeProp,
    onMouseDown,
    error,
    onFocus,
    onBlur,
    testId,
  } = mergedProps;

  const [internalValue, setInternalValue] = useState(getValues({}, options));
  const value = mergedProps.value ?? internalValue;
  if (!options) {
    throw new Error("CheckboxGroup options are invalid");
  }

  const [labelId] = useState(() => `checkbox-group-label-${nanoid()}`);
  const [auxId] = useState(() => `checkbox-group-aux-${nanoid()}`);

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    const newValue = getValues(
      {
        ...value,
        [event.target.name]: event.target.checked,
      },
      options
    );
    onChangeProp?.(newValue);
    setInternalValue(newValue);
  };

  const fieldErrors = Object.values(error ?? {});
  const hasErrors = !!error;

  const checkboxRef = useRef<HTMLDivElement>(null);
  const onCheckboxBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (
        !checkboxRef.current?.contains(event.relatedTarget as HTMLInputElement)
      ) {
        onBlur?.(event);
      }
    },
    [onBlur]
  );

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelId={labelId}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
      testId={testId}
    >
      <div ref={mergeRefs([checkboxRef, innerRef])}>
        <Stack gap="1">
          {options.map(({ key, label }: CheckboxOption) => (
            <InternalCheckbox
              name={key}
              parentName={name}
              color={props.color}
              disabled={disabled}
              isValid={!hasErrors}
              onFocus={onFocus}
              onBlur={onCheckboxBlur}
              onMouseDown={onMouseDown}
              value={value[key] ?? false}
              onChange={onChange}
              key={key}
            >
              {label}
            </InternalCheckbox>
          ))}
        </Stack>
      </div>
    </Field>
  );
};

export default CheckboxGroup;
