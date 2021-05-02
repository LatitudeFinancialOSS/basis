import React from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

interface DeprecatedRenderArgs {
  state: {
    values:Record<string, any>;
    errors: Record<string, any>;
  },
  validateField: (_name: string) => void;
  submitForm: () => void;
  setValues: (_vals: Record<string, any>) => void;
}

interface DeprecatedSubmitParam {
  errors: Record<string, any>,
  values: Record<string, any>,
  setErrors: Record<string, any>,
}

export interface DeprecatedFormProps {
  initialValues: Record<string, any>;
  intialErrors?: Record<string, any>;
  onSubmit?: (_param: DeprecatedSubmitParam) => void;
  debug?: boolean;
  testId?: string;
  children: React.ReactNode | ((_args: DeprecatedRenderArgs) => React.ReactNode);
  width: string;
}


export type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  methods: UseFormReturn<TFieldValues>,
  onSubmit: SubmitHandler<TFieldValues>;
  children: React.ReactNode
}

export type FormCombinedProps<TFieldValues extends FieldValues = FieldValues> = DeprecatedFormProps | FormProps<TFieldValues>;

export const isNewProps = <TFieldValues extends FieldValues = FieldValues>(props: FormCombinedProps<TFieldValues>): props is FormProps<TFieldValues> => {
  return "methods" in props;
}
