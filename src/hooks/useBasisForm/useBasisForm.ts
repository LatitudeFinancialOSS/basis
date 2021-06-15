import {
  DeepPartial,
  FieldPath,
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
import { ValidationError } from "../../types";
import { rhfErrorConverter } from "./rhfErrorConverter";
import { BASIS_INTERNAL_VALIDATION_KEY } from "./useBasisField";

type UseBasisOptions<TFieldValues extends FieldValues = FieldValues> = {
  defaultValues?: UnpackNestedValue<DeepPartial<TFieldValues>>;
};

export function useBasisForm<FieldValues>(
  options: UseBasisOptions<FieldValues> = {}
) {
  const { defaultValues } = options;
  const methods = useForm<FieldValues>({
    mode: "onBlur",
    defaultValues,
  });

  const setBasisError = (
    name: FieldPath<FieldValues>,
    error: ValidationError
  ) => {
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

  return {
    methods,
    Field: Field as FieldComponent<FieldValues>,
    CustomField: CustomField as CustomFieldComponent<FieldValues>,
    setError: setBasisError,
  };
}

export {
  Controller,
  useFieldArray,
  useFormContext,
  useFormState,
  useWatch,
} from "react-hook-form";
