import React, { useState, useMemo, useCallback, useRef } from "react";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import Grid from "../Grid";
import InternalInput from "../internal/InternalInput";
import InternalRadioGroup from "../internal/InternalRadioGroup";
import InternalSelect from "../internal/InternalSelect";
import { InternalFrequencyProps } from "./types";
import { useMergedProps } from "../../hooks/useMergedProps";
import { defaultFrequencyProps } from "./defaultFrequencyProps";
import mergeRefs from "../../utils/mergeRefs";
import { ALL_FREQUENCY_OPTIONS, FrequencyValue } from "../../values";

function Frequency(props: InternalFrequencyProps) {
  const mergedProps = useMergedProps(props, defaultFrequencyProps);
  const {
    mode,
    label,
    annually,
    innerRef = null,
    error,
    quarterly,
    monthly,
    fortnightly,
    weekly,
    amountPrefix,
    amountPlaceholder,
    selectPlaceholder,
    amountMaxLength,
    helpText,
    disabled,
    optional,
    testId,
    onFocus,
    onBlur,
    onChange,
    onMouseDown,
  } = mergedProps;
  const [labelId] = useState(() => `frequency-label-${nanoid()}`);
  const [auxId] = useState(() => `frequency-aux-${nanoid()}`);

  const frequencyOptions = useMemo(() => {
    const frequencyPropsMap = {
      annually,
      quarterly,
      monthly,
      fortnightly,
      weekly,
    };
    return ALL_FREQUENCY_OPTIONS.filter(
      (option) => frequencyPropsMap[option.value]
    );
  }, [annually, quarterly, monthly, fortnightly, weekly]);

  const [internalValue, setInternalValue] = useState<FrequencyValue>({
    amount: "",
    frequency: "",
  });

  const value = props.value ?? internalValue;

  const onFrequencyChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = (event) => {
    const { name: key, value: updatedValue } = event.target;
    if (key !== "amount" && key !== "frequency") {
      return;
    }
    onChange?.({
      ...value,
      [key]: updatedValue,
    });

    setInternalValue((val) => ({
      ...val,
      [key]: updatedValue,
    }));
  };

  const frequencyRef = useRef<HTMLDivElement>(null);

  const fieldErrors = Object.values(error ?? {});
  const hasErrors = !!error;

  const onFrequencyBlur: React.FocusEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = useCallback(
    (event) => {
      if (
        !frequencyRef.current?.contains(event.relatedTarget as HTMLInputElement)
      ) {
        onBlur?.(event);
      }
    },
    [onBlur]
  );
  const inputComponent = (
    <InternalInput
      name="amount"
      variant="numeric"
      aria-label="amount"
      prefix={amountPrefix}
      color={props.color}
      placeholder={amountPlaceholder}
      maxLength={amountMaxLength}
      disabled={disabled}
      onFocus={onFocus}
      onBlur={onFrequencyBlur}
      value={value.amount}
      onChange={onFrequencyChange}
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
      errors={fieldErrors}
    >
      <div
        ref={mergeRefs([innerRef, frequencyRef])}
        aria-invalid={hasErrors ? "true" : "false"}
        aria-labelledby={labelId}
        aria-describedby={helpText || hasErrors ? auxId : undefined}
        data-testid={testId}
      >
        {mode === "radio-group" && (
          <Grid cols={1} rowsGap={1}>
            {inputComponent}
            {frequencyOptions.length > 0 && (
              <InternalRadioGroup
                name="frequency"
                aria-label="frequency"
                color={props.color}
                options={frequencyOptions}
                columns={2}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onFrequencyBlur}
                onMouseDown={onMouseDown}
                value={value.frequency}
                onChange={onFrequencyChange}
              />
            )}
          </Grid>
        )}
        {mode === "select" && (
          <Grid cols={2} colsGap={1}>
            <Grid.Item colSpan="0">{inputComponent}</Grid.Item>
            <Grid.Item colSpan="1">
              <InternalSelect
                name="frequency"
                aria-label="frequency"
                color={props.color}
                optional={optional}
                placeholder={selectPlaceholder}
                options={frequencyOptions}
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onFrequencyBlur}
                value={value.frequency}
                onChange={onFrequencyChange}
              />
            </Grid.Item>
          </Grid>
        )}
      </div>
    </Field>
  );
}

export default Frequency;
