import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import {
  parseISO,
  isValid as isDateValid,
  format as formatDate
} from "date-fns";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useValidation from "../hooks/useValidation";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import Input from "./Input";
import Grid from "./Grid";

const COLORS = ["grey.t05", "white"];

const DAY_REGEX = /^\d{1,2}$/;
const MONTH_REGEX = /^\d{1,2}$/;
const YEAR_REGEX = /^\d{1,4}$/;

const DEFAULT_PROPS = {
  color: "grey.t05",
  optional: false,
  disabled: false,
  validation: [
    {
      validator: ({ day, month, year }, { optional }) => {
        if (day === "" && month === "" && year === "" && optional) {
          return null;
        }

        if (DAY_REGEX.test(day) === false) {
          return "Day must be within 1-31.";
        }

        const dayInt = parseInt(day, 10);

        if (dayInt < 1 || dayInt > 31) {
          return "Day must be within 1-31.";
        }

        return null;
      }
    },
    {
      validator: ({ day, month, year }, { optional }) => {
        if (day === "" && month === "" && year === "" && optional) {
          return null;
        }

        if (MONTH_REGEX.test(month) === false) {
          return "Month must be within 1-12.";
        }

        const monthInt = parseInt(month, 10);

        if (monthInt < 1 || monthInt > 12) {
          return "Month must be within 1-12.";
        }

        return null;
      }
    },
    {
      validator: ({ day, month, year }, { optional }) => {
        if (day === "" && month === "" && year === "" && optional) {
          return null;
        }

        if (YEAR_REGEX.test(year) === false) {
          return "Year must be within 1800-2200.";
        }

        const yearInt = parseInt(year, 10);

        if (yearInt < 1800 || yearInt > 2200) {
          return "Year must be within 1800-2200.";
        }

        return null;
      }
    },
    {
      validator: ({ day, month, year }, { optional }, { previousErrors }) => {
        if (day === "" && month === "" && year === "" && optional) {
          return null;
        }

        if (previousErrors.some(error => error !== null)) {
          return null;
        }

        const twoDigitsDay = day.length === 1 ? `0${day}` : day;
        const twoDigitsMonth = month.length === 1 ? `0${month}` : month;

        if (
          isDateValid(parseISO(`${year}-${twoDigitsMonth}-${twoDigitsDay}`)) ===
          false
        ) {
          return "Invalid date.";
        }

        return null;
      }
    }
  ]
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
    color,
    label,
    optional,
    helpText: helpTextProp,
    disabled,
    data,
    onChange,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `date-picker-${nanoid()}`);
  const [auxId] = useState(() => `date-picker-aux-${nanoid()}`);
  const { value, errors } = data;
  const helpText = useMemo(
    () => getHelpText(value.day, value.month, value.year, helpTextProp),
    [value.day, value.month, value.year, helpTextProp]
  );
  const { validate, onFocus, onBlur } = useValidation({
    props: mergedProps,
    isEmpty: value.day === "" && value.month === "" && value.year === ""
  });

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
        aria-invalid={errors ? "true" : null}
        aria-labelledby={labelId}
        aria-describedby={helpText || errors ? auxId : null}
      >
        <Grid cols={4} colsGutter={1}>
          <Grid.Item colSpan={0}>
            <Input
              color={color}
              type="number"
              placeholder="DD"
              optional={optional}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              validation={[]}
              data={{
                value: value.day
              }}
              onChange={({ value: day }) => {
                const newData = {
                  ...data,
                  value: {
                    ...value,
                    day
                  }
                };

                onChange(newData);

                if (errors?.length > 0) {
                  validate({
                    data: newData
                  });
                }
              }}
            />
          </Grid.Item>
          <Grid.Item colSpan={1}>
            <Input
              color={color}
              type="number"
              placeholder="MM"
              optional={optional}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              validation={[]}
              data={{
                value: value.month
              }}
              onChange={({ value: month }) => {
                const newData = {
                  ...data,
                  value: {
                    ...value,
                    month
                  }
                };

                onChange(newData);

                if (errors?.length > 0) {
                  validate({
                    data: newData
                  });
                }
              }}
            />
          </Grid.Item>
          <Grid.Item colSpan="2-3">
            <Input
              color={color}
              type="number"
              placeholder="YYYY"
              optional={optional}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              validation={[]}
              data={{
                value: value.year
              }}
              onChange={({ value: year }) => {
                const newData = {
                  ...data,
                  value: {
                    ...value,
                    year
                  }
                };

                onChange(newData);

                if (errors?.length > 0) {
                  validate({
                    data: newData
                  });
                }
              }}
            />
          </Grid.Item>
        </Grid>
      </div>
    </Field>
  );
}

DatePicker.propTypes = {
  color: PropTypes.oneOf(COLORS),
  label: PropTypes.string.isRequired,
  optional: PropTypes.bool,
  helpText: PropTypes.string,
  disabled: PropTypes.bool,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      validator: PropTypes.func.isRequired
    })
  ),
  data: PropTypes.shape({
    value: PropTypes.shape({
      day: PropTypes.string,
      month: PropTypes.string,
      year: PropTypes.string
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string
};

export default DatePicker;
