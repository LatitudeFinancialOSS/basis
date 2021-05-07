import { FieldError, ValidateResult } from "react-hook-form";
import { ValidationError } from "../../types";

interface ErrorConverter {
  getRhfError: (error: ValidationError) => ValidateResult;
  getBasisError: (error: FieldError | undefined) => ValidationError;
}

const BASIS_JSON_ERROR_PREFIX = "__basis_json_error_prefix";

export const rhfErrorConverter: ErrorConverter = {
  getRhfError: (error) => {
    if (error === null) {
      return true;
    }

    if (typeof error === "string") {
      return error;
    }

    return `${BASIS_JSON_ERROR_PREFIX}${JSON.stringify(error)}`;
  },

  // TODO: check the error schema based on ComponentName
  // to ensure wrong error scheme doesn't go to the wrong component
  getBasisError: (error) => {
    if (!error?.message) {
      return null;
    }

    // split the result, if it was a simple string it will be the first results
    // if stringified then it will be the second result
    const [stringError, jsonError] = error.message.split(
      BASIS_JSON_ERROR_PREFIX
    );
    if (stringError) {
      return stringError;
    }

    return JSON.parse(jsonError);
  },
};
