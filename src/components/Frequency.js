import React, { useState } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useValidation from "../hooks/useValidation";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import Input from "./Input";
import Grid from "./Grid";
import RadioGroup from "./RadioGroup";
import Select from "./Select";

const ALL_FREQUENCY_OPTIONS = [
  {
    label: "Annually",
    value: "annually"
  },
  {
    label: "Quarterly",
    value: "quarterly"
  },
  {
    label: "Monthly",
    value: "monthly"
  },
  {
    label: "Fortnightly",
    value: "fortnightly"
  },
  {
    label: "Weekly",
    value: "weekly"
  }
];

const COLORS = ["grey.t05", "white"];
const MODES = ["radio-group", "select"];

function isFrequencySelected(frequency, props) {
  return (
    ALL_FREQUENCY_OPTIONS.findIndex(option => option.value === frequency) >
      -1 && props[frequency] === true
  );
}

const DEFAULT_PROPS = {
  color: "grey.t05",
  mode: "radio-group",
  annually: true,
  quarterly: false,
  monthly: true,
  fortnightly: true,
  weekly: true,
  optional: false,
  disabled: false,
  selectPlaceholder: Select.DEFAULT_PROPS.placeholder,
  validation: [
    {
      validator: ({ input, frequency }, props) => {
        const frequencySelected = isFrequencySelected(frequency, props);

        if (input === "" && !frequencySelected && props.optional) {
          return null;
        }

        if (input === "") {
          return "Please enter a valid amount.";
        }

        return null;
      }
    },
    {
      validator: ({ input, frequency }, props) => {
        const frequencySelected = isFrequencySelected(frequency, props);

        if (input === "" && !frequencySelected && props.optional) {
          return null;
        }

        if (!frequencySelected) {
          return "Please select a frequency.";
        }

        return null;
      }
    }
  ]
};

Frequency.ALL_FREQUENCY_OPTIONS = ALL_FREQUENCY_OPTIONS;
Frequency.COLORS = COLORS;
Frequency.MODES = MODES;
Frequency.DEFAULT_PROPS = DEFAULT_PROPS;

function Frequency(props) {
  const { inputColor } = useBackground();
  const inheritedProps = {
    color: inputColor
  };
  const mergedProps = mergeProps(props, DEFAULT_PROPS, inheritedProps, {
    color: color => COLORS.includes(color),
    mode: mode => MODES.includes(mode),
    annually: annually => typeof annually === "boolean",
    quarterly: quarterly => typeof quarterly === "boolean",
    monthly: monthly => typeof monthly === "boolean",
    fortnightly: fortnightly => typeof fortnightly === "boolean",
    weekly: weekly => typeof weekly === "boolean",
    optional: optional => typeof optional === "boolean",
    disabled: disabled => typeof disabled === "boolean"
  });
  const {
    color,
    mode,
    label,
    optional,
    inputPlaceholder,
    selectPlaceholder,
    helpText,
    disabled,
    data,
    onChange,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `frequency-label-${nanoid()}`);
  const [auxId] = useState(() => `frequency-aux-${nanoid()}`);
  const { value, errors } = data;
  const { validate, onFocus, onBlur } = useValidation({
    props: mergedProps,
    isEmpty:
      value.input === "" && !isFrequencySelected(value.frequency, mergedProps)
  });

  const inputComponent = (
    <Input
      color={color}
      type="number"
      placeholder={inputPlaceholder}
      optional={optional}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      validation={[]}
      data={{
        value: value.input
      }}
      onChange={({ value: input }) => {
        const newData = {
          ...data,
          value: {
            ...value,
            input
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
  );
  const frequencyOptions = ALL_FREQUENCY_OPTIONS.reduce((acc, option) => {
    if (mergedProps[option.value] === true) {
      acc.push(option);
    }

    return acc;
  }, []);

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
        {mode === "radio-group" && (
          <Grid cols={1} rowsGutter={1}>
            {inputComponent}
            {frequencyOptions.length > 0 && (
              <RadioGroup
                color={color}
                optional={optional}
                options={frequencyOptions}
                columns={2}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                validation={[]}
                data={{
                  value: value.frequency
                }}
                onChange={({ value: frequency }) => {
                  const newData = {
                    ...data,
                    value: {
                      ...value,
                      frequency
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
            )}
          </Grid>
        )}
        {mode === "select" && (
          <Grid cols={2} colsGutter={1}>
            <Grid.Item colSpan="0">{inputComponent}</Grid.Item>
            <Grid.Item colSpan="1">
              <Select
                color={color}
                optional={optional}
                placeholder={selectPlaceholder}
                options={frequencyOptions}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                validation={[]}
                data={{
                  value: value.frequency
                }}
                onChange={({ value: frequency }) => {
                  const newData = {
                    ...data,
                    value: {
                      ...value,
                      frequency
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
        )}
      </div>
    </Field>
  );
}

Frequency.propTypes = {
  color: PropTypes.oneOf(COLORS),
  mode: PropTypes.oneOf(MODES),
  label: PropTypes.string,
  annually: PropTypes.bool,
  quarterly: PropTypes.bool,
  monthly: PropTypes.bool,
  fortnightly: PropTypes.bool,
  weekly: PropTypes.bool,
  optional: PropTypes.bool,
  inputPlaceholder: PropTypes.string,
  selectPlaceholder: PropTypes.string,
  helpText: PropTypes.node,
  disabled: PropTypes.bool,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      validator: PropTypes.func.isRequired
    })
  ),
  data: PropTypes.shape({
    value: PropTypes.shape({
      input: PropTypes.string,
      frequency: PropTypes.string
    }).isRequired,
    errors: PropTypes.arrayOf(PropTypes.node)
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  testId: PropTypes.string
};

export default Frequency;
