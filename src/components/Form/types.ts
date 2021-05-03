import React from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";

interface DeprecatedRenderParams {
  state: {
    values: Record<string, any>;
    errors: Record<string, any>;
  };
  validateField: (name: string) => void;
  submitForm: () => void;
  setValues: (vals: Record<string, any>) => void;
  setErrors: (errors: Record<string, any>) => void;
  resetForm: () => void;
}

interface DeprecatedSubmitParams {
  errors: Record<string, any>;
  values: Record<string, any>;
  setErrors: (errors: Record<string, any>) => void;
}

export interface DeprecatedFormProps {
  initialValues: Record<string, any>;
  intialErrors?: Record<string, any>;
  onSubmit?: (param: DeprecatedSubmitParams) => void;
  debug?: boolean;
  testId?: string;
  children:
    | React.ReactNode
    | ((args: DeprecatedRenderParams) => React.ReactNode);
  width?: string;
}

export type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
};

export type FormCombinedProps<TFieldValues extends FieldValues = FieldValues> =
  | DeprecatedFormProps
  | FormProps<TFieldValues>;

export const isNewProps = <TFieldValues extends FieldValues = FieldValues>(
  props: FormCombinedProps<TFieldValues>
): props is FormProps<TFieldValues> => {
  return "methods" in props;
};
