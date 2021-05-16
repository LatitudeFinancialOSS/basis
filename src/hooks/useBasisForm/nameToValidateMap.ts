import { ComponentNames } from "../../components/componentNames";
import { ValidateFn } from "../../types";
import { validateDateInput } from "./validation/validateDateInput";
import { validateInput } from "./validation/validateInput";
import { validateRadioGroup } from "./validation/validateRadioGroup";
import { validateSelect } from "./validation/validateSelect";

export const nameToValidateMap: Record<ComponentNames, ValidateFn> = {
  [ComponentNames.Input]: validateInput,
  [ComponentNames.RadioGroup]: validateRadioGroup,
  [ComponentNames.Select]: validateSelect,
  [ComponentNames.DateInput]: validateDateInput,
};
