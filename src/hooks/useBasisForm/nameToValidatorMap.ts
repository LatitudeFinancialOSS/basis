import { ComponentName } from "../../components/ComponentNames";
import { Validator } from "../../types";
import { validateInput } from "./validation/validateInput";

export const nameToValidatorMap: Record<ComponentName, Validator> = {
  [ComponentName.Input]: validateInput,
}
