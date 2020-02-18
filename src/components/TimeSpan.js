import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useForm from "../hooks/internal/useForm";
import { pluralize } from "../utils/string";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalInput from "./internal/InternalInput";
import Grid from "./Grid";

const COLORS = ["grey.t05", "white"];

const YEARS_REGEX = /^\d{1,2}$/;
const MONTHS_REGEX = /^\d{1,2}$/;

const DEFAULT_PROPS = {
  color: "grey.t05",
  optional: false,
  disabled: false,
  validate: ({ years, months }) => {
    const errors = [];

    if (YEARS_REGEX.test(years)) {
      const yearsInt = parseInt(years, 10);

      if (yearsInt < 0 || yearsInt > 99) {
        errors.push("Years must be within 0-99.");
      }
    } else if (years !== "") {
      errors.push("Years must be within 0-99.");
    }

    if (MONTHS_REGEX.test(months)) {
      const monthsInt = parseInt(months, 10);

      if (monthsInt < 0 || monthsInt > 11) {
        errors.push("Months must be within 0-11.");
      }
    } else if (months !== "") {
      errors.push("Months must be within 0-11.");
    }

    if (errors.length === 0) {
      const yearsInt = parseInt(years || "0", 10);
      const monthsInt = parseInt(months || "0", 10);

      if (yearsInt === 0 && monthsInt === 0) {
        errors.push("Must be at least 1 month.");
      }
    }

    return errors;
  }
};

TimeSpan.COLORS = COLORS;
TimeSpan.DEFAULT_PROPS = DEFAULT_PROPS;

function getHelpText(years, months, defaultHelpText) {
  const yearsInt = parseInt(years || "0", 10);
  const monthsInt = parseInt(months || "0", 10);

  if (yearsInt === 0 && monthsInt === 0) {
    return defaultHelpText;
  }

  return [
    {
      count: yearsInt,
      word: "year"
    },
    {
      count: monthsInt,
      word: "month"
    }
  ]
    .filter(({ count }) => count > 0)
    .map(({ count, word }) => pluralize(count, word))
    .join(" and ");
}

function TimeSpan(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    optional: optional => typeof optional === "boolean",
    disabled: disabled => typeof disabled === "boolean"
  });
  const {
    name,
    color,
    label,
    optional,
    helpText: helpTextProp,
    disabled,
    validate,
    testId,
    __internal__yearsFocus,
    __internal__monthsFocus
  } = mergedProps;
  const [labelId] = useState(() => `time-span-${nanoid()}`);
  const [auxId] = useState(() => `time-span-aux-${nanoid()}`);
  const {
    state,
    onFocus,
    onBlur,
    onChange,
    registerField,
    unregisterField
  } = useForm();
  const value = state.values[name];
  const errors = state.errors[name];
  const hasErrors = Array.isArray(errors) && errors.length > 0;
  const helpText = useMemo(
    () => getHelpText(value.years, value.months, helpTextProp),
    [value.years, value.months, helpTextProp]
  );

  useEffect(() => {
    registerField(name, {
      optional,
      validate,
      isEmpty: value => value.years === "" && value.months === ""
    });

    return () => {
      unregisterField(name);
    };
  }, [name, validate, optional, registerField, unregisterField]);

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
      <div
        aria-invalid={hasErrors ? "true" : null}
        aria-labelledby={labelId}
        aria-describedby={helpText || hasErrors ? auxId : null}
      >
        <Grid cols={2} colsGutter={1}>
          <Grid.Item colSpan="0">
            <InternalInput
              color={color}
              type="number"
              placeholder="Years"
              disabled={disabled}
              name={`${name}.years`}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.years}
              onChange={onChange}
              __internal__focus={__internal__yearsFocus}
            />
          </Grid.Item>
          <Grid.Item colSpan="1">
            <InternalInput
              color={color}
              type="number"
              placeholder="Months"
              disabled={disabled}
              name={`${name}.months`}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.months}
              onChange={onChange}
              __internal__focus={__internal__monthsFocus}
            />
          </Grid.Item>
        </Grid>
      </div>
    </Field>
  );
}

TimeSpan.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS),
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  testId: PropTypes.string,
  __internal__yearsFocus: PropTypes.bool,
  __internal__monthsFocus: PropTypes.bool
};

export default TimeSpan;
