import { DeepPartial, FieldValues, UnpackNestedValue, useForm } from "react-hook-form";
import { Field, FieldComponent } from '../../components/Field/Field';
// import { FieldComponent } from '../../components/Form/Field';

type UseBasisOptions<
  TFieldValues extends FieldValues = FieldValues,
> = {
  defaultValues?: UnpackNestedValue<DeepPartial<TFieldValues>>;
};

export function useBasisForm<FieldValues>(options: UseBasisOptions<FieldValues> = {}) {
  const { defaultValues } = options;
  const methods = useForm<FieldValues>({
    mode: "onBlur",
    criteriaMode: "all",
    defaultValues,
  });

  return {
    methods,
    Field: Field as FieldComponent<FieldValues>,
  };
}

export { useFieldArray, useWatch, useFormState } from 'react-hook-form';
