import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import Field from "./internal/Field";
import useContainer from "../hooks/useContainer";
import Input from "./Input";
import Grid from "./Grid";
import useValidation from "../hooks/useValidation";
import { pluralize } from "../utils/string";

const COLORS = ["grey.t05", "white"];

const DEFAULT_PROPS = {
  color: "grey.t05",
  isOptional: false,
  isDisabled: false,
  validation: [
    {
      condition: ({ isOptional }) => !isOptional,
      validator: ({ years }, { isTouched }) => {
        if (!isTouched.years || years === "") {
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
      condition: ({ isOptional }) => !isOptional,
      validator: ({ months }, { isTouched }) => {
        if (!isTouched.months || months === "") {
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
      condition: ({ isOptional }) => !isOptional,
      validator: ({ years, months }, { isTouched }) => {
        if (!isTouched.years && !isTouched.months) {
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

function TimeSpan(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    label,
    isOptional,
    helpText: helpTextProp,
    isDisabled,
    data,
    onChange
  } = props;
  const { inputColor } = useContainer();
  const color =
    !COLORS.includes(_props.color) && inputColor ? inputColor : props.color;
  const [labelId] = useState(() => `time-span-${nanoid()}`);
  const [auxId] = useState(() => `time-span-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState({
    years: false,
    months: false
  });
  const { value, errors } = data;
  const helpText = useMemo(
    () => getHelpText(value.years, value.months, helpTextProp),
    [value.years, value.months, helpTextProp]
  );
  const validate = useValidation({
    props,
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
              isDisabled={isDisabled}
              onFocus={() => {
                setIsTouched({
                  ...isTouched,
                  years: true
                });
              }}
              onBlur={validate}
              validation={[]}
              data={{
                value: value.years
              }}
              onChange={({ value: years }) => {
                onChange({
                  ...data,
                  value: {
                    ...value,
                    years
                  }
                });
              }}
            />
          </Grid.Item>
          <Grid.Item colSpan="1">
            <Input
              color={color}
              type="number"
              placeholder="Months"
              isDisabled={isDisabled}
              onFocus={() => {
                setIsTouched({
                  ...isTouched,
                  months: true
                });
              }}
              onBlur={validate}
              validation={[]}
              data={{
                value: value.months
              }}
              onChange={({ value: months }) => {
                onChange({
                  ...data,
                  value: {
                    ...value,
                    months
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

TimeSpan.propTypes = {
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
      years: PropTypes.string,
      months: PropTypes.string
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default TimeSpan;
