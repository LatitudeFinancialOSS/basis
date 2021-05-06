export const NUMERIC_REGEX = /^\d*$/;
export const DECIMAL_REGEX = /^\d*(\.\d{2})?$/;

const isInputEmpty = (value: string) => value.trim() === "";

export const validateInput = (
  value: string,
  inputProps: Record<string, any>
) => {
  const { optional, variant } = inputProps;

  if (isInputEmpty(value)) {
    return optional ? null : "Required";
  }

  if (variant === "numeric" && NUMERIC_REGEX.test(value) === false) {
    return "Only 0-9 are allowed";
  }

  if (variant === "decimal" && DECIMAL_REGEX.test(value) === false) {
    return "Invalid";
  }

  return null;
};
