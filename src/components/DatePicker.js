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

const DEFAULT_PROPS = {
  color: "grey.t05",
  isOptional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ isOptional }) => !isOptional,
      validator: ({ day }, { isTouched }) => {
        if (!isTouched.day) {
          return null;
        }

        if (/^\d{1,2}$/.test(day) === false) {
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
      condition: ({ isOptional }) => !isOptional,
      validator: ({ month }, { isTouched }) => {
        if (!isTouched.month) {
          return null;
        }

        if (/^\d{1,2}$/.test(month) === false) {
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
      condition: ({ isOptional }) => !isOptional,
      validator: ({ year }, { isTouched }) => {
        if (!isTouched.year) {
          return null;
        }

        if (/^\d{1,4}$/.test(year) === false) {
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
      condition: ({ isOptional }, { previousErrors }) =>
        !isOptional && previousErrors.every(error => error === null),
      validator: ({ day, month, year }, { isTouched }) => {
        if (!isTouched.day || !isTouched.month || !isTouched.year) {
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
    isOptional: isOptional => typeof isOptional === "boolean",
    isDisabled: isDisabled => typeof isDisabled === "boolean"
  });
  const {
    color,
    label,
    isOptional,
    helpText: helpTextProp,
    isDisabled,
    data,
    onChange,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `date-picker-${nanoid()}`);
  const [auxId] = useState(() => `date-picker-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState({
    day: false,
    month: false,
    year: false
  });
  const { value, errors } = data;
  const helpText = useMemo(
    () => getHelpText(value.day, value.month, value.year, helpTextProp),
    [value.day, value.month, value.year, helpTextProp]
  );
  const validate = useValidation({
    props: mergedProps,
    extraData: {
      isTouched
    }
  });

  return (
    <Field
      isOptional={isOptional}
      isDisabled={isDisabled}
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
              isDisabled={isDisabled}
              onFocus={() => {
                setIsTouched({
                  ...isTouched,
                  day: true
                });
              }}
              onBlur={validate}
              validation={[]}
              data={{
                value: value.day
              }}
              onChange={({ value: day }) => {
                onChange({
                  ...data,
                  value: {
                    ...value,
                    day
                  }
                });
              }}
            />
          </Grid.Item>
          <Grid.Item colSpan={1}>
            <Input
              color={color}
              type="number"
              placeholder="MM"
              isDisabled={isDisabled}
              onFocus={() => {
                setIsTouched({
                  ...isTouched,
                  month: true
                });
              }}
              onBlur={validate}
              validation={[]}
              data={{
                value: value.month
              }}
              onChange={({ value: month }) => {
                onChange({
                  ...data,
                  value: {
                    ...value,
                    month
                  }
                });
              }}
            />
          </Grid.Item>
          <Grid.Item colSpan="2-3">
            <Input
              color={color}
              type="number"
              placeholder="YYYY"
              isDisabled={isDisabled}
              onFocus={() => {
                setIsTouched({
                  ...isTouched,
                  year: true
                });
              }}
              onBlur={validate}
              validation={[]}
              data={{
                value: value.year
              }}
              onChange={({ value: year }) => {
                onChange({
                  ...data,
                  value: {
                    ...value,
                    year
                  }
                });
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
  isOptional: PropTypes.bool,
  helpText: PropTypes.string,
  isDisabled: PropTypes.bool,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.func,
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
