import { ComponentNames } from "../../components/componentNames";
import { ValidateFn } from "../../types";
import {
  validateAutoComplete,
  validateCheckbox,
  validateCheckboxGroup,
  validateDateInput,
  validateFrequency,
  validateInput,
  validateRadioGroup,
  validateSelect,
  validateTextarea,
} from "./validation";

export const nameToValidateMap: Record<ComponentNames, ValidateFn> = {
  [ComponentNames.Input]: validateInput as ValidateFn,
  [ComponentNames.RadioGroup]: validateRadioGroup as ValidateFn,
  [ComponentNames.Select]: validateSelect as ValidateFn,
  [ComponentNames.DateInput]: validateDateInput as ValidateFn,
  [ComponentNames.Textarea]: validateTextarea as ValidateFn,
  [ComponentNames.Frequency]: validateFrequency as ValidateFn,
  [ComponentNames.Checkbox]: validateCheckbox as ValidateFn,
  [ComponentNames.CheckboxGroup]: validateCheckboxGroup as ValidateFn,
  [ComponentNames.AutoComplete]: validateAutoComplete as ValidateFn,
};
