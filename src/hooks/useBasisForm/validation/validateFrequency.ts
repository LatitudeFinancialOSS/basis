import { InternalFrequencyProps } from "../../../components/Frequency/types";
import {
  ALL_FREQUENCY_OPTIONS,
  FrequencyError,
  FrequencyValue,
} from "../../../values";
import { isInputEmpty, NUMERIC_REGEX } from "./validateInput";

export const validateFrequency = (
  value: FrequencyValue,
  props: InternalFrequencyProps
) => {
  const { annually, quarterly, monthly, fortnightly, weekly, optional } = props;

  const frequencyPropsMap = {
    annually,
    quarterly,
    monthly,
    fortnightly,
    weekly,
  };

  const options = ALL_FREQUENCY_OPTIONS.filter(
    (option) => frequencyPropsMap[option.value]
  );

  const { frequency, amount } = value;

  const error: FrequencyError = {};

  if (isInputEmpty(amount) && !optional) {
    error.amount = "Please enter an amount.";
  } else if (NUMERIC_REGEX.test(value.amount) === false) {
    error.amount = "Amount can contain only digits.";
  }

  const isFrequencySelected = options.some(({ value }) => value === frequency);

  if (!isFrequencySelected && !optional) {
    error.frequency = "Please select a frequency";
  }

  return Object.values(error).length === 0 ? null : error;
};
