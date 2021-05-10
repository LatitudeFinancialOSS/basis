import { ComponentNames } from "../../components/componentNames";
import { ValidateFn } from "../../types";
import { validateInput } from "./validation/validateInput";
import { validateRadioGroup } from "./validation/validateRadioGroup";

export const nameToValidateMap: Record<ComponentNames, ValidateFn> = {
  [ComponentNames.Input]: validateInput,
  [ComponentNames.RadioGroup]: validateRadioGroup,
};
