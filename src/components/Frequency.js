import React, { useState, useMemo, useCallback } from "react";
import PropTypes from "prop-types";
import nanoid from "nanoid";
import useBackground from "../hooks/useBackground";
import useField from "../hooks/internal/useField";
import { mergeProps } from "../utils/component";
import Field from "./internal/Field";
import Grid from "./Grid";
import InternalInput from "./internal/InternalInput";
import InternalRadioGroup from "./internal/InternalRadioGroup";
import InternalSelect from "./internal/InternalSelect";

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

const { COLORS } = InternalInput;
const MODES = ["radio-group", "select"];

function isFrequencySelected(frequency, frequencyPropsMap) {
  return (
    ALL_FREQUENCY_OPTIONS.findIndex(option => option.value === frequency) >
      -1 && frequencyPropsMap[frequency] === true
  );
}

const DEFAULT_PROPS = {
  color: InternalInput.DEFAULT_PROPS.color,
  mode: "radio-group",
  annually: true,
  quarterly: true,
  monthly: true,
  fortnightly: true,
  weekly: true,
  disabled: false,
  selectPlaceholder: InternalSelect.DEFAULT_PROPS.placeholder,
  optional: false,
  validate: (value, { isInputEmpty, isFrequencyEmpty }) => {
    const errors = [];

    if (isInputEmpty(value.amount)) {
      errors.push("Please enter a valid amount.");
    }

    if (isFrequencyEmpty(value.frequency)) {
      errors.push("Please select a frequency.");
    }

    return errors;
  }
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
    disabled: disabled => typeof disabled === "boolean",
    optional: optional => typeof optional === "boolean"
  });
  const {
    name,
    color,
    mode,
    label,
    annually,
    quarterly,
    monthly,
    fortnightly,
    weekly,
    optional,
    amountPlaceholder,
    selectPlaceholder,
    helpText,
    disabled,
    validate,
    validateData,
    testId
  } = mergedProps;
  const [labelId] = useState(() => `frequency-label-${nanoid()}`);
  const [auxId] = useState(() => `frequency-aux-${nanoid()}`);
  const frequencyPropsMap = useMemo(
    () => ({
      annually,
      quarterly,
      monthly,
      fortnightly,
      weekly
    }),
    [annually, quarterly, monthly, fortnightly, weekly]
  );
  const frequencyOptions = useMemo(
    () =>
      ALL_FREQUENCY_OPTIONS.reduce((acc, option) => {
        if (frequencyPropsMap[option.value] === true) {
          acc.push(option);
        }

        return acc;
      }, []),
    [frequencyPropsMap]
  );
  const isInputEmpty = useCallback(amount => {
    return amount === "";
  }, []);
  const isFrequencyEmpty = useCallback(
    frequency => {
      return isFrequencySelected(frequency, frequencyPropsMap) === false;
    },
    [frequencyPropsMap]
  );
  const isEmpty = useCallback(
    ({ amount, frequency }) => {
      return isInputEmpty(amount) && isFrequencyEmpty(frequency);
    },
    [isInputEmpty, isFrequencyEmpty]
  );
  const data = useMemo(
    () => ({
      isInputEmpty,
      isFrequencyEmpty,
      isEmpty,
      data: validateData
    }),
    [isInputEmpty, isFrequencyEmpty, isEmpty, validateData]
  );
  const {
    value,
    errors,
    hasErrors,
    onFocus,
    onBlur,
    onChange,
    onMouseDown
  } = useField({
    name,
    disabled,
    optional,
    validate,
    data
  });
  const inputComponent = (
    <InternalInput
      name={`${name}.amount`}
      color={color}
      type="number"
      placeholder={amountPlaceholder}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onBlur}
      value={value.amount}
      onChange={onChange}
    />
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
        {mode === "radio-group" && (
          <Grid cols={1} rowsGutter={1}>
            {inputComponent}
            {frequencyOptions.length > 0 && (
              <InternalRadioGroup
                name={`${name}.frequency`}
                color={color}
                options={frequencyOptions}
                columns={2}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                onMouseDown={onMouseDown}
                value={value.frequency}
                onChange={onChange}
              />
            )}
          </Grid>
        )}
        {mode === "select" && (
          <Grid cols={2} colsGutter={1}>
            <Grid.Item colSpan="0">{inputComponent}</Grid.Item>
            <Grid.Item colSpan="1">
              <InternalSelect
                name={`${name}.frequency`}
                color={color}
                optional={optional}
                placeholder={selectPlaceholder}
                options={frequencyOptions}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onBlur}
                value={value.frequency}
                onChange={onChange}
              />
            </Grid.Item>
          </Grid>
        )}
      </div>
    </Field>
  );
}

Frequency.propTypes = {
  name: PropTypes.string.isRequired,
  color: PropTypes.oneOf(COLORS),
  mode: PropTypes.oneOf(MODES),
  label: PropTypes.string.isRequired,
  annually: PropTypes.bool,
  quarterly: PropTypes.bool,
  monthly: PropTypes.bool,
  fortnightly: PropTypes.bool,
  weekly: PropTypes.bool,
  amountPlaceholder: PropTypes.string,
  selectPlaceholder: PropTypes.string,
  helpText: PropTypes.node,
  disabled: PropTypes.bool,
  optional: PropTypes.bool,
  validate: PropTypes.oneOfType([PropTypes.func, PropTypes.bool]),
  validateData: PropTypes.object,
  testId: PropTypes.string
};

export default Frequency;
