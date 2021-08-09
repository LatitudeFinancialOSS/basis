import React from "react";
import { FieldValues, FormProvider } from "react-hook-form";
import useResponsivePropsCSS from "../../hooks/useResponsivePropsCSS";
import { responsiveSize } from "../../utils/css";
import { FormProps } from "./types";

export function Form<TFieldValues extends FieldValues = FieldValues>({
  methods,
  children,
  onSubmit,
  testId,
  ...rest
}: FormProps<TFieldValues>) {
  const { handleSubmit } = methods;
  const responsiveFormCSS = useResponsivePropsCSS(
    rest,
    {},
    {
      width: responsiveSize("width"),
    }
  );

  return (
    <FormProvider {...methods}>
      <form
        css={responsiveFormCSS}
        action="#"
        data-testid={testId}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        {children}
      </form>
    </FormProvider>
  );
}
