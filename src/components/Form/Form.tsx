import React from "react";
import { FieldValues, FormProvider } from "react-hook-form"
import { FormProps } from "./types";

export function Form<TFieldValues extends FieldValues = FieldValues>({
  methods,
  children,
  onSubmit,
}: FormProps<TFieldValues>){
  const { handleSubmit } = methods;

  const submitHandler = handleSubmit(onSubmit);

  return (
    <FormProvider {...methods}>
      <form onSubmit={submitHandler}>
        {children}
      </form>
    </FormProvider>
  )
}
