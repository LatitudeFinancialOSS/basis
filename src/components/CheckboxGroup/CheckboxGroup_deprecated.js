import React, { useState, useMemo, useCallback } from "react";
import { nanoid } from "nanoid";
import useField from "../../hooks/internal/useField";
import InternalCheckbox from "../internal/InternalCheckbox";
import Field from "../internal/Field";
import Stack from "../Stack";
import { mergeProps, areCheckboxOptionsValid } from "../../utils/component";
import { defaultCheckboxGroupProps } from "./defaultCheckboxGroupProps";

const { COLORS } = InternalCheckbox;

const DEFAULT_PROPS = {
  ...defaultCheckboxGroupProps,
  color: InternalCheckbox.DEFAULT_PROPS.color,
  validate: (value, { isEmpty }) => {
    if (isEmpty(value)) {
      return "Please make a selection.";
    }

    return null;
  },
};

CheckboxGroup.COLORS = COLORS;
CheckboxGroup.DEFAULT_PROPS = DEFAULT_PROPS;

function getKeyFromName(name) {
  const index = name.lastIndexOf(".");

  return name.slice(index + 1);
}

function CheckboxGroup(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      color: (color) => COLORS.includes(color),
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
      options: (options) => areCheckboxOptionsValid(options),
    }
  );
  const {
    name,
    label,
    options,
    helpText,
    disabled,
    optional,
    validate,
    validateData,
    onChange: onChangeProp,
    testId,
  } = mergedProps;

  if (!options) {
    throw new Error("CheckboxGroup options are invalid");
  }

  const [labelId] = useState(() => `checkbox-group-label-${nanoid()}`);
  const [auxId] = useState(() => `checkbox-group-aux-${nanoid()}`);
  const isEmpty = useCallback((value) => {
    for (const key in value) {
      if (value[key] === true) {
        return false;
      }
    }

    return true;
  }, []);
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
  } = useField("CheckboxGroup", {
    name,
    disabled,
    optional,
    validate,
    data,
  });
  const onChange = useCallback(
    (event) => {
      fieldOnChange(event);

      onChangeProp &&
        onChangeProp({
          value: {
            ...value,
            [getKeyFromName(event.target.name)]: event.target.checked,
          },
        });
    },
    [fieldOnChange, onChangeProp, value]
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
      <Stack gap="1">
        {options.map(({ key, label }) => (
          <InternalCheckbox
            name={`${name}.${key}`}
            parentName={name}
            // eslint-disable-next-line react/prop-types
            color={props.color}
            disabled={disabled}
            isValid={!hasErrors}
            onFocus={onFocus}
            onBlur={onBlur}
            onMouseDown={onMouseDown}
            value={value[key]}
            onChange={onChange}
            key={key}
          >
            {label}
          </InternalCheckbox>
        ))}
      </Stack>
    </Field>
  );
}

export default CheckboxGroup;
