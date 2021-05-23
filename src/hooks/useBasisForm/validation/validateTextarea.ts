import { InternalTextareaProps } from "../../../components/Textarea/types";

const isTextareaEmpty = (value: string) => value.trim() === "";

export const validateTextarea = (
  value: string,
  textareaProps: Record<string, any>
) => {
  const { optional } = textareaProps as InternalTextareaProps;

  if (isTextareaEmpty(value)) {
    return optional ? null : "Required";
  }

  return null;
};
