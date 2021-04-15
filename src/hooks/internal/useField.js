import { useEffect, useRef } from "react";
import useForm from "./useForm";
import { getPath } from "../../utils/objectPath";
import { notStringOrEmpty } from "../../utils/string";

function useField(componentName, { name, disabled, optional, validate, data }) {
  if (notStringOrEmpty(name)) {
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

  // We use this ref to ensure that registerField and unregisterField are called only
  // on component mount and unmount. In other words, we want to ensure that the useEffect
  // below has an empty dependency array.
  const registerDataRef = useRef();

  registerDataRef.current = {
    registerField,
    unregisterField,
    name,
    disabled,
    optional,
    validate,
    data,
  };

  if (typeof state.values === "undefined") {
    throw new Error("Form is missing initialValues");
  }

  const value = getPath(state.values, name);

  if (typeof value === "undefined") {
    throw new Error(`${name} is missing in Form's initialValues`);
  }

  const errors = getPath(state.errors, name);
  const hasErrors = Array.isArray(errors) && errors.length > 0;

  useEffect(() => {
    const {
      registerField,
      unregisterField,
      name,
      disabled,
      optional,
      validate,
      data,
    } = registerDataRef.current;

    registerField(name, {
      disabled,
      optional,
      validate,
      data,
    });

    return () => {
      unregisterField(name);
    };
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
