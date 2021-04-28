import { useEffect, useRef } from "react";
import useForm from "./useForm";
import { getPath } from "../../utils/objectPath";

function useField(componentName, { name, disabled, optional, validate, data }) {
  if (typeof name !== "string" || name.trim() === "") {
    throw new Error(`${componentName} component is missing a name prop`);
  }
  const {
    state,
    onFocus,
    onBlur,
    onChange,
    onMouseDown,
    registerField,
    unregisterField,
  } = useForm(componentName);

  const registerDataRef = useRef({
    registerField,
    unregisterField,
    name,
    disabled,
    optional,
    validate,
    data,
  });

  if (typeof state.values === "undefined") {
    throw new Error("Form is missing initialValues");
  }

  const value = getPath(state.values, name);

  if (typeof value === "undefined") {
    throw new Error(`${name} is missing in Form's initialValues`);
  }

  const errors = getPath(state.errors, name);
  const hasErrors = Array.isArray(errors) && errors.length > 0;

  // we need to store the data in a ref so that if the validateData prop changes, we have a reference
  // that we can update with the new value.
  useEffect(() => {
    registerDataRef.current = {
      ...registerDataRef.current,
      registerField,
      unregisterField,
      name,
      disabled,
      optional,
      validate,
      data,
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, disabled, optional, validate, data]);

  useEffect(() => {
    registerField(name, registerDataRef);

    return () => {
      unregisterField(name);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    value,
    errors,
    hasErrors,
    onFocus,
    onBlur,
    onChange,
    onMouseDown,
  };
}

export default useField;
