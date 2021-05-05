import React from "react";
import { FormCombinedProps, isNewProps } from "./types";
import { default as FormDeprecated } from "./Form_deprecated";
import { Form as FormInternal } from "./Form";
import { FieldValues } from "react-hook-form";

const Form = <TFieldValues extends FieldValues = FieldValues>(
  props: FormCombinedProps<TFieldValues>
) => {
  if (isNewProps(props)) {
    return <FormInternal {...props} />;
  }

  // @ts-ignore
  return <FormDeprecated {...props} />;
};

export default Form;
