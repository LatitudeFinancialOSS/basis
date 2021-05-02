const NUMERIC_REGEX = /^\d*$/;
const DECIMAL_REGEX = /^\d*(\.\d{2})?$/;

export const validateInput = (value: string, inputProps: Record<string, any>) => {
    const { optional, variant } = inputProps;

    if (!value && !optional) {
      return "Required";
    }

    if (variant === "numeric" && NUMERIC_REGEX.test(value) === false) {
      return "Only 0-9 are allowed";
    }

    if (variant === "decimal" && DECIMAL_REGEX.test(value) === false) {
      return "Invalid";
    }

    return null;
  };
