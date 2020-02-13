import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useValidation from "../hooks/useValidation";
import { pluralize } from "../utils/string";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import Input from "./Input";
import Grid from "./Grid";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  optional: false,
  disabled: false,
  validation: [
    {
      validator: ({ years }) => {
        if (years === "") {
          return null;
        }

        if (/^\d{1,2}$/.test(years) === false) {
          return "Years must be within 0-99.";
        }

        const yearsInt = parseInt(years, 10);

        if (yearsInt < 0 || yearsInt > 99) {
          return "Years must be within 0-99.";
        }

        return null;
      }
    },
    {
      validator: ({ months }) => {
        if (months === "") {
          return null;
        }

        if (/^\d{1,2}$/.test(months) === false) {
          return "Months must be within 0-11.";
        }

        const monthsInt = parseInt(months, 10);

        if (monthsInt < 0 || monthsInt > 11) {
          return "Months must be within 0-11.";
        }

        return null;
      }
    },
    {
      validator: ({ years, months }, { optional }) => {
        if (years === "" && months === "" && optional) {
          return null;
        }

        const yearsInt = parseInt(years || "0", 10);
        const monthsInt = parseInt(months || "0", 10);

        if (yearsInt === 0 && monthsInt === 0) {
          return "Must be at least 1 month.";
        }

        return null;
      }
    }
  ]
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
    color,
    label,
    optional,
    helpText: helpTextProp,
    disabled,
    data,
    onChange,
    testId,
    __internal__yearsFocus,
    __internal__monthsFocus
  } = mergedProps;
  const [labelId] = useState(() => `time-span-${nanoid()}`);
  const [auxId] = useState(() => `time-span-aux-${nanoid()}`);
  const { value, errors } = data;
  const helpText = useMemo(
    () => getHelpText(value.years, value.months, helpTextProp),
    [value.years, value.months, helpTextProp]
  );
  const { validate, onFocus, onBlur } = useValidation({
    props: mergedProps,
    isEmpty: value.years === "" && value.months === ""
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
        <Grid cols={2} colsGutter={1}>
          <Grid.Item colSpan="0">
            <Input
              color={color}
              type="number"
              placeholder="Years"
              optional={optional}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              validation={[]}
              data={{
                value: value.years
              }}
              onChange={({ value: years }) => {
                const newData = {
                  ...data,
                  value: {
                    ...value,
                    years
                  }
                };

                onChange(newData);

                if (errors?.length > 0) {
                  validate({
                    data: newData
                  });
                }
              }}
              __internal__focus={__internal__yearsFocus}
            />
          </Grid.Item>
          <Grid.Item colSpan="1">
            <Input
              color={color}
              type="number"
              placeholder="Months"
              optional={optional}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onBlur}
              validation={[]}
              data={{
                value: value.months
              }}
              onChange={({ value: months }) => {
                const newData = {
                  ...data,
                  value: {
                    ...value,
                    months
                  }
                };

                onChange(newData);

                if (errors?.length > 0) {
                  validate({
                    data: newData
                  });
                }
              }}
              __internal__focus={__internal__monthsFocus}
            />
          </Grid.Item>
        </Grid>
      </div>
    </Field>
  );
}

TimeSpan.propTypes = {
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
      years: PropTypes.string,
      months: PropTypes.string
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string,
  __internal__yearsFocus: PropTypes.bool,
  __internal__monthsFocus: PropTypes.bool
};

export default TimeSpan;
