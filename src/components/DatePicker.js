import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  parseISO,
  isValid as isDateValid,
  format as formatDate
} from "date-fns";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useField from "../hooks/internal/useField";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalInput from "./internal/InternalInput";
import Grid from "./Grid";

const { COLORS } = InternalInput;

const DAY_REGEX = /^\d{1,2}$/;
const MONTH_REGEX = /^\d{1,2}$/;
const YEAR_REGEX = /^\d{1,4}$/;

const DEFAULT_PROPS = {
  color: InternalInput.DEFAULT_PROPS.color,
  disabled: false,
  optional: false,
  validate: ({ day, month, year }) => {
    const errors = [];

    if (DAY_REGEX.test(day)) {
      const dayInt = parseInt(day, 10);

      if (dayInt < 1 || dayInt > 31) {
        errors.push("Day must be within 1-31.");
      }
    } else {
      errors.push("Day must be within 1-31.");
    }

    if (MONTH_REGEX.test(month)) {
      const monthInt = parseInt(month, 10);

      if (monthInt < 1 || monthInt > 12) {
        errors.push("Month must be within 1-12.");
      }
    } else {
      errors.push("Month must be within 1-12.");
    }

    if (YEAR_REGEX.test(year)) {
      const yearInt = parseInt(year, 10);

      if (yearInt < 1800 || yearInt > 2200) {
        errors.push("Year must be within 1800-2200.");
      }
    } else {
      errors.push("Year must be within 1800-2200.");
    }

    if (errors.length === 0) {
      const twoDigitsDay = day.length === 1 ? `0${day}` : day;
      const twoDigitsMonth = month.length === 1 ? `0${month}` : month;

      if (
        isDateValid(parseISO(`${year}-${twoDigitsMonth}-${twoDigitsDay}`)) ===
        false
      ) {
        errors.push("Invalid date.");
      }
    }

    return errors;
  }
};

DatePicker.COLORS = COLORS;
DatePicker.DEFAULT_PROPS = DEFAULT_PROPS;

function getHelpText(day, month, year, defaultHelpText) {
  const dayInt = parseInt(day || "0", 10);
  const monthInt = parseInt(month || "0", 10);
  const yearInt = parseInt(year || "0", 10);

  if (dayInt === 0 || monthInt === 0 || yearInt === 0) {
    return defaultHelpText;
  }

  return formatDate(new Date(yearInt, monthInt - 1, dayInt), "d MMMM, yyyy");
}

function DatePicker(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    disabled: disabled => typeof disabled === "boolean",
    optional: optional => typeof optional === "boolean"
  });
  const {
    name,
    color,
    label,
    helpText: helpTextProp,
    disabled,
    optional,
    validate,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `date-picker-${nanoid()}`);
  const [auxId] = useState(() => `date-picker-aux-${nanoid()}`);
  const isEmpty = useCallback(
    value => value.day === "" && value.month === "" && value.year === "",
    []
  );
  const data = useMemo(
    () => ({
      isEmpty
    }),
    [isEmpty]
  );
  const { value, errors, hasErrors, onFocus, onBlur, onChange } = useField({
    name,
    disabled,
    optional,
    validate,
    data
  });
  const helpText = useMemo(
    () => getHelpText(value.day, value.month, value.year, helpTextProp),
    [value.day, value.month, value.year, helpTextProp]
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
        <Grid cols={4} colsGutter={1}>
          <Grid.Item colSpan={0}>
            <InternalInput
              name={`${name}.day`}
              color={color}
              type="number"
              placeholder="DD"
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.day}
              onChange={onChange}
            />
          </Grid.Item>
          <Grid.Item colSpan={1}>
            <InternalInput
              name={`${name}.month`}
              color={color}
              type="number"
              placeholder="MM"
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.month}
              onChange={onChange}
            />
          </Grid.Item>
          <Grid.Item colSpan="2-3">
            <InternalInput
              name={`${name}.year`}
              color={color}
              type="number"
              placeholder="YYYY"
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.year}
              onChange={onChange}
            />
          </Grid.Item>
        </Grid>
      </div>
    </Field>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS),
  label: PropTypes.string.isRequired,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  testId: PropTypes.string
};

export default DatePicker;
