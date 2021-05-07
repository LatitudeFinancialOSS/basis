import React from "react";
import { FieldValues, SubmitHandler, UseFormReturn } from "react-hook-form";
import { ResponsiveProp } from "../../types";

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

export type DeprecatedFormProps = {
  initialValues: Record<string, any>;
  intialErrors?: Record<string, any>;
  onSubmit?: (params: DeprecatedSubmitParams) => void;
  debug?: boolean;
  testId?: string;
  children:
    | React.ReactNode
    | ((params: DeprecatedRenderParams) => React.ReactNode);
} & ResponsiveProp<"width">;

export type FormProps<TFieldValues extends FieldValues = FieldValues> = {
  methods: UseFormReturn<TFieldValues>;
  onSubmit: SubmitHandler<TFieldValues>;
  children: React.ReactNode;
  testId?: string;
} & ResponsiveProp<"width">;

export type FormCombinedProps<TFieldValues extends FieldValues = FieldValues> =
  | DeprecatedFormProps
  | FormProps<TFieldValues>;

export const isNewProps = <TFieldValues extends FieldValues = FieldValues>(
  props: FormCombinedProps<TFieldValues>
): props is FormProps<TFieldValues> => {
  return "methods" in props;
};
