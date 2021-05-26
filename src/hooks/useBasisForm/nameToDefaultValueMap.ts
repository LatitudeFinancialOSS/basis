import { ComponentNames } from "../../components/componentNames";

export const nameToDefaultValueMap: Record<ComponentNames, any> = {
  [ComponentNames.Input]: "",
  [ComponentNames.Textarea]: "",
  [ComponentNames.RadioGroup]: "",
  [ComponentNames.Select]: "",
  [ComponentNames.DateInput]: {
    day: "",
    month: "",
    year: "",
  },
  [ComponentNames.Frequency]: {
    amount: "",
    frequency: "",
  },
};
