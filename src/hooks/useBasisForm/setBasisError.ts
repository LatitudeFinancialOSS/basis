import { FieldPath, UseFormReturn } from "react-hook-form";
import { ValidationError } from "../../types";
import { rhfErrorConverter } from "./rhfErrorConverter";
import { BASIS_INTERNAL_VALIDATION_KEY } from "./useBasisField";

export const setBasisError = <FieldValues>(
  methods: UseFormReturn<FieldValues>
) => (name: FieldPath<FieldValues>, error: ValidationError) => {
  const message = rhfErrorConverter.getRhfError(error);
  if (typeof message !== "string") {
    return;
  }

  const { setError } = methods;
  setError(name, {
    type: BASIS_INTERNAL_VALIDATION_KEY,
    message,
  });
};
