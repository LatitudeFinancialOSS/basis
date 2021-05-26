import { isValid, parseISO } from "date-fns";
import { InternalDateInputProps } from "../../../components/DateInput/types";
import { DateInputError, DateInputValue } from "../../../values";
const isDateInputEmpty = (
  { day, month, year }: DateInputValue,
  props: InternalDateInputProps
) =>
  (props.dayMode === "none" || day.trim() === "") &&
  month.trim() === "" &&
  year.trim() === "";

export const DAY_REGEX = /^([012]?[1-9]|[123]0|31)$/;
export const MONTH_REGEX = /^(0?[1-9]|1[012])$/;
export const TWO_DIGITS_YEAR_REGEX = /^\d{2}$/;
export const FOUR_DIGITS_YEAR_REGEX = /^(19|20|21)\d{2}$/;

export const validateDateInput = (
  value: DateInputValue,
  props: InternalDateInputProps
) => {
  const { dayMode, optional, yearMode } = props;

  if (!optional && isDateInputEmpty(value, props)) {
    return { field: "Required" };
  }

  const { day, month, year } = value;
  const errors: DateInputError = {};

  if (dayMode === "2-digits") {
    if (DAY_REGEX.test(day) === false) {
      errors.day = "Day must be within 1-31.";
    }
  }

  if (MONTH_REGEX.test(month) === false) {
    errors.month = "Month must be within 1-12.";
  }

  if (yearMode === "2-digits") {
    if (TWO_DIGITS_YEAR_REGEX.test(year) === false) {
      errors.year = "Year must be within 00-99.";
    }
  } else {
    if (FOUR_DIGITS_YEAR_REGEX.test(year) === false) {
      errors.year = "Year must be within 1900-2199.";
    }
  }

  if (dayMode === "2-digits" && Object.values(errors).length === 0) {
    const twoDigitsDay = day.length === 1 ? `0${day}` : day;
    const twoDigitsMonth = month.length === 1 ? `0${month}` : month;

    if (
      isValid(
        parseISO(
          `${
            yearMode === "2-digits" ? `20${year}` : year
          }-${twoDigitsMonth}-${twoDigitsDay}`
        )
      ) === false
    ) {
      errors.field = "Invalid date.";
    }
  }

  return Object.values(errors).length ? errors : null;
};
