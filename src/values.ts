import { OptionsValues } from "./types";

export interface DateInputValue {
  day: string;
  month: string;
  year: string;
}

export type DateInputError = {
  day?: string;
  month?: string;
  year?: string;
  field?: string;
};

export const ALL_FREQUENCY_OPTIONS = [
  {
    label: "Annually",
    value: "annually",
  },
  {
    label: "Quarterly",
    value: "quarterly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Fortnightly",
    value: "fortnightly",
  },
  {
    label: "Weekly",
    value: "weekly",
  },
] as const;

type FrequencyOptionValue = OptionsValues<typeof ALL_FREQUENCY_OPTIONS>;

export type FrequencyValue = {
  amount: string;
  frequency: FrequencyOptionValue;
};

export type FrequencyError = {
  amount?: string;
  frequency?: string;
  field?: string;
};
