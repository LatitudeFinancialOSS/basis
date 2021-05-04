import { ComponentName } from "../../components/componentName";
import { ValidateFn } from "../../types";
import { validateInput } from "./validation/validateInput";

export const nameToValidateMap: Record<ComponentName, ValidateFn> = {
  [ComponentName.Input]: validateInput,
};
