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
  day: true,
  disabled: false,
  optional: false,
  validate: ({ day, month, year }, data) => {
    const errors = [];

    if (data.day) {
      if (DAY_REGEX.test(day)) {
        const dayInt = parseInt(day, 10);

        if (dayInt < 1 || dayInt > 31) {
          errors.push("Day must be within 1-31.");
        }
      } else {
        errors.push("Day must be within 1-31.");
      }
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

    if (data.day && errors.length === 0) {
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

function getHelpText(value, day, defaultHelpText) {
  const dayInt = day ? parseInt(value.day || "0", 10) : 1;
  const monthInt = parseInt(value.month || "0", 10);
  const yearInt = parseInt(value.year || "0", 10);

  if ((day && dayInt === 0) || monthInt === 0 || yearInt === 0) {
    return defaultHelpText;
  }

  return formatDate(
    new Date(yearInt, monthInt - 1, dayInt),
    day ? "d MMMM, yyyy" : "MMMM, yyyy"
  );
}

function DatePicker(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    day: day => typeof day === "boolean",
    disabled: disabled => typeof disabled === "boolean",
    optional: optional => typeof optional === "boolean"
  });
  const {
    name,
    color,
    label,
    day,
    helpText: helpTextProp,
    disabled,
    optional,
    validate,
    validateData,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `date-picker-${nanoid()}`);
  const [auxId] = useState(() => `date-picker-aux-${nanoid()}`);
  const isEmpty = useCallback(
    value =>
      (day === false || value.day === "") &&
      value.month === "" &&
      value.year === "",
    [day]
  );
  const data = useMemo(
    () => ({
      isEmpty,
      day,
      ...(validateData && { data: validateData })
    }),
    [isEmpty, day, validateData]
  );
  const { value, errors, hasErrors, onFocus, onBlur, onChange } = useField({
    name,
    disabled,
    optional,
    validate,
    data
  });
  const helpText = useMemo(() => getHelpText(value, day, helpTextProp), [
    value,
    day,
    helpTextProp
  ]);

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
        <Grid cols={day ? 4 : 3} colsGap={1}>
          {day && (
            <Grid.Item colSpan={0}>
              <InternalInput
                name={`${name}.day`}
                parentName={name}
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
          )}
          <Grid.Item colSpan={day ? 1 : 0}>
            <InternalInput
              name={`${name}.month`}
              parentName={name}
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
          <Grid.Item colSpan={day ? "2-3" : "1-2"}>
            <InternalInput
              name={`${name}.year`}
              parentName={name}
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
  day: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.any,
  testId: PropTypes.string
};

export default DatePicker;
