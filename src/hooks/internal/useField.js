import { useEffect } from "react";
import useForm from "./useForm";

function useField({ name, disabled, optional, validate, data }) {
  const {
    state,
    onFocus,
    onBlur,
    onChange,
    onMouseDown,
    registerField,
    unregisterField
  } = useForm();
  const value = state.values[name];
  const errors = state.errors[name];
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
