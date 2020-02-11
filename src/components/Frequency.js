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

const DEFAULT_PROPS = {
  color: "grey.t05",
  mode: "radio-group",
  annually: true,
  quarterly: false,
  monthly: true,
  fortnightly: true,
  weekly: true,
  optional: false,
  isDisabled: false,
  selectPlaceholder: Select.DEFAULT_PROPS.placeholder,
  validation: [
    {
      condition: ({ optional }) => !optional,
      validator: ({ input }, { isTouched }) => {
        if (!isTouched.input) {
          return null;
        }

        if (input === "") {
          return "Please enter a valid amount.";
        }

        return null;
      }
    },
    {
      condition: ({ optional }) => !optional,
      validator: ({ frequency }, { isTouched, props }) => {
        if (!isTouched.frequency) {
          return null;
        }

        const selectedOption = ALL_FREQUENCY_OPTIONS.find(
          option => option.value === frequency
        );

        if (!selectedOption || props[selectedOption.value] !== true) {
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
    isDisabled: isDisabled => typeof isDisabled === "boolean"
  });
  const {
    color,
    mode,
    label,
    optional,
    inputPlaceholder,
    selectPlaceholder,
    helpText,
    isDisabled,
    data,
    onChange,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `frequency-label-${nanoid()}`);
  const [auxId] = useState(() => `frequency-aux-${nanoid()}`);
  const [isTouched, setIsTouched] = useState({
    input: false,
    frequency: false
  });
  const { value, errors } = data;
  const validate = useValidation({
    props: mergedProps,
    extraData: {
      isTouched,
      props: mergedProps
    }
  });
  const inputComponent = (
    <Input
      color={color}
      type="number"
      placeholder={inputPlaceholder}
      isDisabled={isDisabled}
      onFocus={() => {
        setIsTouched({
          ...isTouched,
          input: true
        });
      }}
      onBlur={validate}
      validation={[]}
      data={{
        value: value.input
      }}
      onChange={({ value: input }) => {
        onChange({
          ...data,
          value: {
            ...value,
            input
          }
        });
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
        {mode === "radio-group" && (
          <Grid cols={1} rowsGutter={1}>
            {inputComponent}
            {frequencyOptions.length > 0 && (
              <RadioGroup
                color={color}
                options={frequencyOptions}
                columns={2}
                isDisabled={isDisabled}
                onFocus={() => {
                  setIsTouched({
                    ...isTouched,
                    frequency: true
                  });
                }}
                onBlur={validate}
                validation={[]}
                data={{
                  value: value.frequency
                }}
                onChange={({ value: frequency }) => {
                  onChange({
                    ...data,
                    value: {
                      ...value,
                      frequency
                    }
                  });
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
                placeholder={selectPlaceholder}
                options={frequencyOptions}
                isDisabled={isDisabled}
                onFocus={() => {
                  setIsTouched({
                    ...isTouched,
                    frequency: true
                  });
                }}
                onBlur={validate}
                validation={[]}
                data={{
                  value: value.frequency
                }}
                onChange={({ value: frequency }) => {
                  onChange({
                    ...data,
                    value: {
                      ...value,
                      frequency
                    }
                  });
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
  isDisabled: PropTypes.bool,
  validation: PropTypes.arrayOf(
    PropTypes.shape({
      condition: PropTypes.func,
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
