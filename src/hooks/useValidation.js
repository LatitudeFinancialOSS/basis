import { useEffect, useCallback, useRef } from "react";
import useForm from "./useForm";

function useValidation({ props, isEmpty }) {
  const { validation, onChange } = props;
  const formData = useForm();
  const validate = useCallback(
    ({ data = props.data } = {}) => {
      const errors = validation.reduce((acc, item) => {
        const auxData = {
          previousErrors: acc
        };
        const error = item.validator(data.value, props, auxData);

        if (error) {
          acc.push(error);
        }

        return acc;
      }, []);

      const errorsCount = errors.length;

      onChange({
        ...data,
        errors: errorsCount === 0 ? null : errors
      });

      return errorsCount;
    },
    [props, validation, onChange]
  );
  const isFocused = useRef(false);
  const onFocus = () => {
    isFocused.current = true;
  };
  const onBlur = () => {
    isFocused.current = false;

    if (!isEmpty) {
      /* 
        setTimeout is needed in order to wait and see if other inputs gets focused.
        I found that if we wait less than 100ms, isFocused.current could still be false
        even though we focused on another input.
      */
      setTimeout(() => {
        if (!isFocused.current) {
          validate();
        }
      }, 100);
    }
  };

  useEffect(() => {
    if (validation.length === 0) {
      return;
    }

    formData?.registerValidation?.(validate);

    return () => {
      formData?.unregisterValidation?.(validate);
    };
  }, [validation, formData, validate]);

  return {
    validate,
    onFocus,
    onBlur
  };
}

export default useValidation;
