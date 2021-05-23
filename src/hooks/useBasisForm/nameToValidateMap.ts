import { ComponentNames } from "../../components/componentNames";
import { ValidateFn } from "../../types";
import {
  validateDateInput,
  validateInput,
  validateRadioGroup,
  validateSelect,
  validateTextarea,
} from "./validation";

export const nameToValidateMap: Record<ComponentNames, ValidateFn> = {
  [ComponentNames.Input]: validateInput,
  [ComponentNames.RadioGroup]: validateRadioGroup,
  [ComponentNames.Select]: validateSelect,
  [ComponentNames.DateInput]: validateDateInput,
  [ComponentNames.Textarea]: validateTextarea,
};
