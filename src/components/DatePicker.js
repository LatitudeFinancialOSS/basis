import React, { useState, useEffect, useMemo } from "react";
import PropTypes from "prop-types";
import {
  parseISO,
  isValid as isDateValid,
  format as formatDate
} from "date-fns";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useForm from "../hooks/internal/useForm";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalInput from "./internal/InternalInput";
import Grid from "./Grid";

const COLORS = ["grey.t05", "white"];

const DAY_REGEX = /^\d{1,2}$/;
const MONTH_REGEX = /^\d{1,2}$/;
const YEAR_REGEX = /^\d{1,4}$/;

const DEFAULT_PROPS = {
  color: "grey.t05",
  optional: false,
  disabled: false,
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
    testId
  } = mergedProps;
  const [labelId] = useState(() => `date-picker-${nanoid()}`);
  const [auxId] = useState(() => `date-picker-aux-${nanoid()}`);
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
    () => getHelpText(value.day, value.month, value.year, helpTextProp),
    [value.day, value.month, value.year, helpTextProp]
  );

  useEffect(() => {
    registerField(name, {
      optional,
      validate,
      isEmpty: value =>
        value.day === "" && value.month === "" && value.year === ""
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
        <Grid cols={4} colsGutter={1}>
          <Grid.Item colSpan={0}>
            <InternalInput
              color={color}
              type="number"
              placeholder="DD"
              disabled={disabled}
              name={`${name}.day`}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.day}
              onChange={onChange}
            />
          </Grid.Item>
          <Grid.Item colSpan={1}>
            <InternalInput
              color={color}
              type="number"
              placeholder="MM"
              disabled={disabled}
              name={`${name}.month`}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.month}
              onChange={onChange}
            />
          </Grid.Item>
          <Grid.Item colSpan="2-3">
            <InternalInput
              color={color}
              type="number"
              placeholder="YYYY"
              disabled={disabled}
              name={`${name}.year`}
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
  optional: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  validate: PropTypes.func,
  testId: PropTypes.string
};

export default DatePicker;
