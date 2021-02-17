import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useField from "../hooks/internal/useField";
import { pluralize } from "../utils/string";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import Grid from "./Grid";
import InternalInput from "./internal/InternalInput";

const { COLORS } = InternalInput;

const YEARS_REGEX = /^\d{1,2}$/;
const MONTHS_REGEX = /^\d{1,2}$/;

const DEFAULT_PROPS = {
  color: InternalInput.DEFAULT_PROPS.color,
  disabled: false,
  optional: false,
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
  },
};

function getHelpText(years, months, defaultHelpText) {
  const yearsInt = parseInt(years || "0", 10);
  const monthsInt = parseInt(months || "0", 10);

  if (
    isNaN(yearsInt) ||
    isNaN(monthsInt) ||
    (yearsInt === 0 && monthsInt === 0)
  ) {
    return defaultHelpText;
  }

  return [
    {
      count: yearsInt,
      word: "year",
    },
    {
      count: monthsInt,
      word: "month",
    },
  ]
    .filter(({ count }) => count > 0)
    .map(({ count, word }) => pluralize(count, word))
    .join(" and ");
}

TimeSpan.COLORS = COLORS;
TimeSpan.DEFAULT_PROPS = DEFAULT_PROPS;
TimeSpan.getHelpText = getHelpText;

function TimeSpan(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      color: (color) => COLORS.includes(color),
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
    }
  );
  const {
    name,
    label,
    helpText: helpTextProp,
    disabled,
    optional,
    validate,
    validateData,
    testId,
    __internal__yearsFocus,
    __internal__monthsFocus,
  } = mergedProps;
  const [labelId] = useState(() => `time-span-${nanoid()}`);
  const [auxId] = useState(() => `time-span-aux-${nanoid()}`);
  const isEmpty = useCallback(
    (value) => value.years.trim() === "" && value.months.trim() === "",
    []
  );
  const data = useMemo(
    () => ({
      isEmpty,
      ...(validateData && { data: validateData }),
    }),
    [isEmpty, validateData]
  );
  const { value, errors, hasErrors, onFocus, onBlur, onChange } = useField(
    "TimeSpan",
    {
      name,
      disabled,
      optional,
      validate,
      data,
    }
  );
  const helpText = useMemo(
    () => getHelpText(value.years, value.months, helpTextProp),
    [value.years, value.months, helpTextProp]
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
      <div
        aria-invalid={hasErrors ? "true" : null}
        aria-labelledby={labelId}
        aria-describedby={helpText || hasErrors ? auxId : null}
      >
        <Grid cols={2} colsGap={1}>
          <Grid.Item colSpan="0">
            <InternalInput
              name={`${name}.years`}
              parentName={name}
              variant="numeric"
              color={props.color}
              placeholder="Years"
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.years}
              onChange={onChange}
              __internal__focus={__internal__yearsFocus}
            />
          </Grid.Item>
          <Grid.Item colSpan="1">
            <InternalInput
              name={`${name}.months`}
              parentName={name}
              variant="numeric"
              color={props.color}
              placeholder="Months"
              disabled={disabled}
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
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  testId: PropTypes.string,
  __internal__yearsFocus: PropTypes.bool,
  __internal__monthsFocus: PropTypes.bool,
};

export default TimeSpan;
