import { useEffect } from "react";
import useForm from "./useForm";
import { getPath } from "../../utils/objectPath";
import { ERROR_STRINGS } from "../../utils/error";

function useField({ name, disabled, optional, validate, data }) {
  if (!name || name.trim() === "") {
    throw new Error(ERROR_STRINGS.FIELD.NAME_REQUIRED);
  }

  const {
    state,
    onFocus,
    onBlur,
    onChange,
    onMouseDown,
    registerField,
    unregisterField
  } = useForm();

  if (typeof state.values === "undefined") {
    throw new Error(ERROR_STRINGS.FIELD.NO_INITIAL_VALUE);
  }

  const value = getPath(state.values, name);

  if (typeof value === "undefined") {
    throw new Error(ERROR_STRINGS.FIELD.NO_INITIAL_VALUE);
  }

  const errors = getPath(state.errors, name);
  const hasErrors = Array.isArray(errors) && errors.length > 0;

  useEffect(() => {
    registerField(name, {
      disabled,
      optional,
      validate,
      data
    });

    return () => {
      unregisterField(name);
    };
  }, [
    name,
    disabled,
    optional,
    validate,
    data,
    registerField,
    unregisterField
  ]);

  return {
    value,
    errors,
    hasErrors,
    onFocus,
    onBlur,
    onChange,
    onMouseDown
  };
}

export default useField;
