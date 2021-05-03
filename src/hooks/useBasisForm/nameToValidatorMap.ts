import { ComponentName } from "../../components/componentName";
import { ValidateFn } from "../../types";
import { validateInput } from "./validation/validateInput";

export const nameToValidatorMap: Record<ComponentName, ValidateFn> = {
  [ComponentName.Input]: validateInput,
};
