import React from "react";
import { FieldValues, FormProvider } from "react-hook-form";
import { FormProps } from "./types";

export function Form<TFieldValues extends FieldValues = FieldValues>({
  methods,
  children,
  onSubmit,
}: FormProps<TFieldValues>) {
  const { handleSubmit } = methods;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
}
