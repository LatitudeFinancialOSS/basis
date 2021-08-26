import { AutoCompleteProps } from "../../components/AutoComplete/types";
import { ComponentNames } from "../../components/componentNames";

export const nameToGetDefaultValueMap: Record<ComponentNames, any> = {
  [ComponentNames.Input]: () => "",
  [ComponentNames.Textarea]: () => "",
  [ComponentNames.RadioGroup]: () => "",
  [ComponentNames.Select]: () => "",
  [ComponentNames.DateInput]: () => ({
    day: "",
    month: "",
    year: "",
  }),
  [ComponentNames.Frequency]: () => ({
    amount: "",
    frequency: "",
  }),
  [ComponentNames.Checkbox]: () => false,
  [ComponentNames.CheckboxGroup]: () => ({}),
  [ComponentNames.AutoComplete]: ({ emptyValue }: AutoCompleteProps<any>) =>
    emptyValue,
};
