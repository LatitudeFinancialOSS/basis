import { useCallback } from "react";
import { useForm, UseFormProps } from "react-hook-form";
import { CustomField } from "../../components/Field/CustomField";
import { Field } from "../../components/Field/Field";
import {
  CustomFieldComponent,
  FieldComponent,
} from "../../components/Field/types";
import { setBasisError } from "./setBasisError";

export function useBasisForm<FieldValues>(
  options: UseFormProps<FieldValues> = {}
) {
  const methods = useForm<FieldValues>({
    ...options,
    mode: "onBlur",
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setError = useCallback(setBasisError(methods), [methods]);

  return {
    methods,
    Field: Field as FieldComponent<FieldValues>,
    CustomField: CustomField as CustomFieldComponent<FieldValues>,
    setError,
  };
}
