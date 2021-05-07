import { ComponentNames } from "../../components/componentNames";
import { ValidateFn } from "../../types";
import { validateInput } from "./validation/validateInput";

export const nameToValidateMap: Record<ComponentNames, ValidateFn> = {
  [ComponentNames.Input]: validateInput,
};
