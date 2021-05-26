import { InternalTextareaProps } from "../../../components/Textarea/types";

const isTextareaEmpty = (value: string) => value.trim() === "";

export const validateTextarea = (
  value: string,
  textareaProps: InternalTextareaProps
) => {
  const { optional } = textareaProps;

  if (isTextareaEmpty(value)) {
    return optional ? null : "Required";
  }

  return null;
};
