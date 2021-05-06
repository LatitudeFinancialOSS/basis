import { FieldError, ValidateResult } from "react-hook-form";
import { ValidationError } from "../../types";

interface ErrorConverter {
  getRhfError: (error: ValidationError) => ValidateResult;
  getBasisError: (error: FieldError | undefined) => ValidationError;
}

const BasisErrorKey = "__basis_stringified_error";

export const rhfErrorConverter: ErrorConverter = {
  getRhfError: (error) => {
    if (error === null) {
      return true;
    }

    // if the error is an object or array then stringify the result
    if (typeof error === "object") {
      return `${BasisErrorKey}${JSON.stringify(error)}`;
    }

    return error;
  },
  // TODO: check the error schema based on ComponentName
  // to ensure wrong error scheme doesn't go to the wrong component
  getBasisError: (error) => {
    if (!error?.message) {
      return null;
    }

    // split the result, if it was a simple string it will be the first results
    // if stringified then it will be the second result
    const [simpleError, stringifiedError] = error.message.split(BasisErrorKey);
    if (simpleError) {
      return simpleError;
    }

    return JSON.parse(stringifiedError);
  },
};
