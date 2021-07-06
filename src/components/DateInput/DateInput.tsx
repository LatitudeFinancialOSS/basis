import React, { useState, useMemo, useCallback, useRef } from "react";
import {
  isValid as isDateValid,
  format as formatDate,
  parseISO,
} from "date-fns";
import { nanoid } from "nanoid";
import Field from "../internal/Field";
import InternalInput from "../internal/InternalInput";
import Grid from "../Grid";
import { DayMode, InternalDateInputProps, YearMode } from "./types";
import mergeRefs from "../../utils/mergeRefs";
import {
  DAY_REGEX,
  FOUR_DIGITS_YEAR_REGEX,
  MONTH_REGEX,
  TWO_DIGITS_YEAR_REGEX,
} from "../../hooks/useBasisForm/validation/validateDateInput";
import { defaultDateInputProps } from "./defaultDateInputProps";
import { useMergedProps } from "../../hooks/useMergedProps";
import { DateInputValue } from "../../values";

const { COLORS } = InternalInput;
const DAY_MODES = ["none", "2-digits"] as const;
const YEAR_MODES = ["2-digits", "4-digits"] as const;

export const DEFAULT_PROPS = {
  ...defaultDateInputProps,
  color: InternalInput.DEFAULT_PROPS.color,
  validate: (value: DateInputValue, { isEmpty, dayMode, yearMode }: any) => {
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
} as const;

DateInput.COLORS = COLORS;
DateInput.DAY_MODES = DAY_MODES;
DateInput.YEAR_MODES = YEAR_MODES;
DateInput.DEFAULT_PROPS = DEFAULT_PROPS;

function getHelpText(
  value: DateInputValue,
  dayMode: DayMode,
  yearMode: YearMode,
  defaultHelpText: string = ""
) {
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

  if (!isDateValid(date)) {
    return defaultHelpText;
  }

  return formatDate(date, dayMode === "2-digits" ? "d MMMM yyyy" : "MMMM yyyy");
}
function DateInput(props: InternalDateInputProps) {
  const mergedProps = useMergedProps(props, defaultDateInputProps);
  const {
    label,
    onBlur,
    onFocus,
    innerRef,
    dayMode,
    yearMode,
    helpText: helpTextProp,
    disabled,
    optional,
    "aria-labelledby": ariaLabelledby,
    testId,
    error,
  } = mergedProps;
  const labelId = useMemo(() => `date-input-${nanoid()}`, []);
  const auxId = useMemo(() => `date-input-aux-${nanoid()}`, []);

  const [internalValue, setInternalValue] = useState<DateInputValue>({
    day: "",
    month: "",
    year: "",
  });

  const value = mergedProps.value ?? internalValue;

  const helpText = useMemo(
    () => getHelpText(value, dayMode, yearMode, helpTextProp),
    [value, dayMode, yearMode, helpTextProp]
  );

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    let { name: key, value: updatedValue } = event.target;
    if (key !== "day" && key !== "month" && key !== "year") {
      return;
    }
    props.onChange?.({
      ...value,
      [key]: updatedValue,
    });

    setInternalValue((val) => ({
      ...val,
      [key]: updatedValue,
    }));
  };

  const dateInputRef = useRef<HTMLDivElement>(null);

  const onDateInputBlur: React.FocusEventHandler<HTMLInputElement> = useCallback(
    (event) => {
      if (
        !dateInputRef.current?.contains(event.relatedTarget as HTMLInputElement)
      ) {
        onBlur?.(event);
      }
    },
    [onBlur]
  );

  const fieldErrors = Object.values(error ?? {});
  const hasErrors = !!error;

  return (
    <Field
      optional={optional}
      disabled={disabled}
      label={label}
      labelId={labelId}
      renderLabel={ariaLabelledby === undefined}
      auxId={auxId}
      helpText={helpText}
      errors={fieldErrors}
      testId={testId}
    >
      <div
        ref={mergeRefs([dateInputRef, innerRef ?? null])}
        aria-invalid={hasErrors ? "true" : "false"}
        aria-labelledby={ariaLabelledby || labelId}
        aria-describedby={helpText || hasErrors ? auxId : undefined}
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
                name="day"
                aria-label="day"
                variant="numeric"
                color={props.color}
                placeholder="DD"
                maxLength="2"
                disabled={disabled}
                onFocus={onFocus}
                onBlur={onDateInputBlur}
                value={value.day}
                onChange={onChange}
              />
            </Grid.Item>
          )}
          <Grid.Item colSpan={dayMode === "2-digits" ? 1 : 0}>
            <InternalInput
              name="month"
              aria-label="month"
              variant="numeric"
              color={props.color}
              placeholder="MM"
              maxLength="2"
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onDateInputBlur}
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
              name="year"
              aria-label="year"
              variant="numeric"
              color={props.color}
              placeholder={yearMode === "2-digits" ? "YY" : "YYYY"}
              maxLength={yearMode === "2-digits" ? "2" : "4"}
              disabled={disabled}
              onFocus={onFocus}
              onBlur={onDateInputBlur}
              value={value.year}
              onChange={onChange}
            />
          </Grid.Item>
        </Grid>
      </div>
    </Field>
  );
}

DateInput.defaultProps = {
  optional: true,
};

export default DateInput;
