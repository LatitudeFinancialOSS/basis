import { useCallback } from "react";
import {
  DeepPartial,
  FieldValues,
  UnpackNestedValue,
  useForm,
} from "react-hook-form";
import { CustomField } from "../../components/Field/CustomField";
import { Field } from "../../components/Field/Field";
import {
  CustomFieldComponent,
  FieldComponent,
} from "../../components/Field/types";
import { setBasisError } from "./setBasisError";

type UseBasisOptions<TFieldValues extends FieldValues = FieldValues> = {
  defaultValues?: UnpackNestedValue<DeepPartial<TFieldValues>>;
  shouldUnregister?: boolean;
};

export function useBasisForm<FieldValues>(
  options: UseBasisOptions<FieldValues> = {}
) {
  const { defaultValues, shouldUnregister } = options;
  const methods = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues,
    shouldUnregister,
  });

  const setError = useCallback(() => setBasisError(methods), [methods]);

  return {
    methods,
    Field: Field as FieldComponent<FieldValues>,
    CustomField: CustomField as CustomFieldComponent<FieldValues>,
    setError,
  };
}
