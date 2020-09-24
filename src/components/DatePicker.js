import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import {
  parseISO,
  isValid as isDateValid,
  format as formatDate,
} from "date-fns";
import { nanoid } from "nanoid";
import useField from "../hooks/internal/useField";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import InternalInput from "./internal/InternalInput";
import Grid from "./Grid";

const { COLORS } = InternalInput;
const DAY_MODES = ["none", "2-digits"];
const YEAR_MODES = ["2-digits", "4-digits"];

const DAY_REGEX = /^([012]?[1-9]|[123]0|31)$/;
const MONTH_REGEX = /^(0?[1-9]|1[012])$/;
const TWO_DIGITS_YEAR_REGEX = /^\d{2}$/;
const FOUR_DIGITS_YEAR_REGEX = /^(19|20|21)\d{2}$/;

const DEFAULT_PROPS = {
  color: InternalInput.DEFAULT_PROPS.color,
  dayMode: "2-digits",
  yearMode: "4-digits",
  disabled: false,
  optional: false,
  validate: (value, { isEmpty, dayMode, yearMode }) => {
    if (isEmpty(value)) {
      return "Required";
    }

    const { day, month, year } = value;
    const errors = [];

    if (dayMode === "2-digits") {
      if (DAY_REGEX.test(day) === false) {
        errors.push("Day must be within 1-31.");
      }
    }

    if (MONTH_REGEX.test(month) === false) {
      errors.push("Month must be within 1-12.");
    }

    if (yearMode === "2-digits") {
      if (TWO_DIGITS_YEAR_REGEX.test(year) === false) {
        errors.push("Year must be within 00-99.");
      }
    } else {
      if (FOUR_DIGITS_YEAR_REGEX.test(year) === false) {
        errors.push("Year must be within 1900-2199.");
      }
    }

    if (dayMode === "2-digits" && errors.length === 0) {
      const twoDigitsDay = day.length === 1 ? `0${day}` : day;
      const twoDigitsMonth = month.length === 1 ? `0${month}` : month;

      if (
        isDateValid(
          parseISO(
            `${
              yearMode === "2-digits" ? `20${year}` : year
            }-${twoDigitsMonth}-${twoDigitsDay}`
          )
        ) === false
      ) {
        errors.push("Invalid date.");
      }
    }

    return errors;
  },
};

DatePicker.COLORS = COLORS;
DatePicker.DAY_MODES = DAY_MODES;
DatePicker.YEAR_MODES = YEAR_MODES;
DatePicker.DEFAULT_PROPS = DEFAULT_PROPS;

function getHelpText(value, dayMode, yearMode, defaultHelpText) {
  if (
    (dayMode === "2-digits" && DAY_REGEX.test(value.day) === false) ||
    MONTH_REGEX.test(value.month) === false ||
    (yearMode === "2-digits" &&
      TWO_DIGITS_YEAR_REGEX.test(value.year) === false) ||
    (yearMode === "4-digits" &&
      FOUR_DIGITS_YEAR_REGEX.test(value.year) === false)
  ) {
    return defaultHelpText;
  }

  const dayInt = dayMode === "2-digits" ? parseInt(value.day, 10) : 1;
  const monthInt = parseInt(value.month, 10);
  const yearInt = parseInt(value.year, 10);

  const date = new Date(
    yearMode === "2-digits" ? 2000 + yearInt : yearInt,
    monthInt - 1,
    dayInt
  );

  if (isNaN(date)) {
    return defaultHelpText;
  }

  return formatDate(date, dayMode === "2-digits" ? "d MMMM yyyy" : "MMMM yyyy");
}

function DatePicker(props) {
  const mergedProps = mergeProps(
    props,
    DEFAULT_PROPS,
    {},
    {
      color: (color) => COLORS.includes(color),
      dayMode: (dayMode) => DAY_MODES.includes(dayMode),
      yearMode: (yearMode) => YEAR_MODES.includes(yearMode),
      disabled: (disabled) => typeof disabled === "boolean",
      optional: (optional) => typeof optional === "boolean",
      "aria-labelledby": (ariaLabelledby) =>
        typeof ariaLabelledby === "string" && ariaLabelledby.trim() !== "",
    }
  );
  const {
    name,
    label,
    dayMode,
    yearMode,
    helpText: helpTextProp,
    disabled,
    optional,
    validate,
    validateData,
    "aria-labelledby": ariaLabelledby,
    testId,
  } = mergedProps;
  const [labelId] = useState(() => `date-picker-${nanoid()}`);
  const [auxId] = useState(() => `date-picker-aux-${nanoid()}`);
  const isEmpty = useCallback(
    ({ day, month, year }) =>
      (dayMode === "none" || day.trim() === "") &&
      month.trim() === "" &&
      year.trim() === "",
    [dayMode]
  );
  const data = useMemo(
    () => ({
      isEmpty,
      dayMode,
      yearMode,
      ...(validateData && { data: validateData }),
    }),
    [isEmpty, dayMode, yearMode, validateData]
  );
  const { value, errors, hasErrors, onFocus, onBlur, onChange } = useField(
    "DatePicker",
    {
      name,
      disabled,
      optional,
      validate,
      data,
    }
  );
  const helpText = useMemo(
    () => getHelpText(value, dayMode, yearMode, helpTextProp),
    [value, dayMode, yearMode, helpTextProp]
  );

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelId={labelId}
      renderLabel={ariaLabelledby === undefined}
      auxId={auxId}
      helpText={helpText}
      errors={errors}
      testId={testId}
    >
      <div
        aria-invalid={hasErrors ? "true" : null}
        aria-labelledby={ariaLabelledby || labelId}
        aria-describedby={helpText || hasErrors ? auxId : null}
      >
        <Grid
          cols={
            dayMode === "none" && yearMode === "2-digits"
              ? 2
              : dayMode === "2-digits" && yearMode === "4-digits"
              ? 4
              : 3
          }
          colsGap={1}
        >
          {dayMode === "2-digits" && (
            <Grid.Item colSpan={0}>
              <InternalInput
                name={`${name}.day`}
                parentName={name}
                variant="numeric"
                color={props.color}
                placeholder="DD"
                maxLength="2"
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value.day}
                onChange={onChange}
              />
            </Grid.Item>
          )}
          <Grid.Item colSpan={dayMode === "2-digits" ? 1 : 0}>
            <InternalInput
              name={`${name}.month`}
              parentName={name}
              variant="numeric"
              color={props.color}
              placeholder="MM"
              maxLength="2"
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              value={value.month}
              onChange={onChange}
            />
          </Grid.Item>
          <Grid.Item
            colSpan={
              dayMode === "none" && yearMode === "2-digits"
                ? "1"
                : dayMode === "none" && yearMode === "4-digits"
                ? "1-2"
                : dayMode === "2-digits" && yearMode === "2-digits"
                ? "2"
                : "2-3"
            }
          >
            <InternalInput
              name={`${name}.year`}
              parentName={name}
              variant="numeric"
              color={props.color}
              placeholder={yearMode === "2-digits" ? "YY" : "YYYY"}
              maxLength={yearMode === "2-digits" ? "2" : "4"}
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
  label: PropTypes.string,
  dayMode: PropTypes.oneOf(DAY_MODES),
  yearMode: PropTypes.oneOf(YEAR_MODES),
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  "aria-labelledby": PropTypes.string,
  testId: PropTypes.string,
};

export default DatePicker;
