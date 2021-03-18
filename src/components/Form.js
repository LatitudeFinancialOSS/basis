import React, {
  useState,
  useEffect,
  useMemo,
  useCallback,
  useRef,
} from "react";
import PropTypes from "prop-types";
import { FormProvider } from "../hooks/internal/useForm";
import { getPath, setPath, deletePath } from "../utils/objectPath";
import { responsiveWidthType } from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveSize } from "../utils/css";
import { formatArray } from "../utils/array";

const DEFAULT_PROPS = {
  debug: false,
};

function getParentFieldName(target) {
  return target.dataset.parentName ?? target.name;
}

Form.DEFAULT_PROPS = DEFAULT_PROPS;

function Form(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const {
    initialValues,
    initialErrors,
    onSubmit,
    debug,
    children,
    testId,
  } = props;
  const [state, setState] = useState({
    values: initialValues,
    errors: initialErrors ?? {},
    shouldValidateOnChange: false,
    namesToValidate: null,
    submitStatus: "READY",
  });
  const exposedState = useMemo(
    () => ({
      values: state.values,
      errors: state.errors,
    }),
    [state.values, state.errors]
  );
  const fields = useRef({});
  const lastFocusedFieldName = useRef(null);
  const lastMouseDownInputElement = useRef(null);
  const onFocus = (event) => {
    const { target } = event;
    const parentName = getParentFieldName(target);

    lastFocusedFieldName.current = parentName;

    setState((state) => {
      const errors = getPath(state.errors, parentName);
      const hasErrors = Array.isArray(errors) && errors.length > 0;

      return setPath(state, "shouldValidateOnChange", hasErrors);
    });
  };
  const onBlur = (event) => {
    const { target } = event;
    const parentName = getParentFieldName(target);

    lastFocusedFieldName.current = null;

    if (target === lastMouseDownInputElement.current) {
      lastMouseDownInputElement.current = null;
    }

    /* 
      We use setTimeout in order to differentiate between onBlur to another field within
      the same parent (e.g. DatePicker) and onBlur out of the parent.
    */
    setTimeout(() => {
      if (
        isMountedRef.current &&
        parentName !== lastFocusedFieldName.current &&
        (lastMouseDownInputElement.current === null ||
          parentName !== getParentFieldName(lastMouseDownInputElement.current))
      ) {
        setState((state) => setPath(state, "namesToValidate", [parentName]));
      }
    });
  };
  const onChange = (event) => {
    const { target } = event;
    const { name } = target;
    const isCheckbox = target.type === "checkbox";
    const newValue = isCheckbox ? target.checked : event.value ?? target.value;

    setState((state) => {
      let newState = setPath(state, `values.${name}`, newValue);

      /*
        Without validating the Checkbox on every change, we have the following unwanted behaviour.
        When the Checkbox is not checked:
          1. Click the Checkbox twice (it should be unchecked again).
          2. Press the Checkbox without releasing it (validation error appears).
          3. If you resease the Checkbox now, the validation error disappears.
      */
      if (state.shouldValidateOnChange || isCheckbox) {
        newState = setPath(newState, "namesToValidate", [
          getParentFieldName(target),
        ]);
      }

      return newState;
    });
  };
  const onMouseDown = (event) => {
    const { target } = event;
    const document = target.ownerDocument;
    const inputElement = document.querySelector(`#${target.htmlFor}`);

    lastMouseDownInputElement.current = inputElement;
  };
  const registerField = (name, field) => {
    fields.current[name] = field;
  };
  const unregisterField = (name) => {
    delete fields.current[name];
  };
  const providerValue = {
    state,
    onFocus, // should be called by inputs
    onBlur, // should be called by inputs
    onChange, // should be called by inputs
    onMouseDown, // should be called by input labels that have a "for" attribute
    registerField,
    unregisterField,
  };
  const getFieldErrors = useCallback((values, name) => {
    const value = getPath(values, name);
    const field = fields.current[name];

    if (
      !field || // See: https://stackoverflow.com/q/65659161/247243
      field.disabled === true ||
      (field.optional === true &&
        typeof field.data?.isEmpty === "function" &&
        field.data.isEmpty(value) === true)
    ) {
      return null;
    }

    if (typeof field.validate === "function") {
      const errors = field.validate(value, field.data);

      if (typeof errors === "string") {
        return [errors];
      }

      if (Array.isArray(errors) && errors.length > 0) {
        return errors;
      }
    }

    return null;
  }, []);
  const getNewErrors = useCallback(
    (state) => {
      const { namesToValidate, values } = state;

      return namesToValidate.reduce((acc, name) => {
        const errors = getFieldErrors(values, name);

        return errors === null
          ? deletePath(acc, name, { deleteEmptyObjects: true })
          : setPath(acc, name, errors);
      }, state.errors);
    },
    [getFieldErrors]
  );
  const validateField = useCallback(
    (name) => {
      if (fields.current[name]) {
        setState((state) => {
          const errors = getFieldErrors(state.values, name);

          return errors === null
            ? deletePath(state, `errors.${name}`, {
                deleteEmptyObjects: { except: ["errors"] },
              })
            : setPath(state, `errors.${name}`, errors);
        });
      } else {
        console.error(
          `Can't validate field "${name}" because it's not found. Existing fields: ${formatArray(
            Object.keys(fields.current)
          )}`
        );
      }
    },
    [getFieldErrors]
  );
  const submitForm = useCallback(() => {
    setState((state) => ({
      ...state,
      namesToValidate: Object.keys(fields.current),
      submitStatus: "VALIDATE_THEN_SUBMIT",
    }));
  }, []);
  const onFormSubmit = useCallback(
    (event) => {
      event.preventDefault();
      submitForm();
    },
    [submitForm]
  );
  const setValues = (updateValues) => {
    setState((state) => {
      return {
        ...state,
        values: updateValues(state.values),
      };
    });
  };
  const setErrors = useCallback((errorsMap) => {
    setState((state) => {
      const newErrors = Object.keys(fields.current).reduce((acc, name) => {
        if (typeof errorsMap[name] === "string") {
          acc[name] = [errorsMap[name]];
        } else if (Array.isArray(errorsMap[name])) {
          acc[name] = errorsMap[name];
        } else {
          acc[name] = state.errors[name];
        }

        return acc;
      }, {});

      return {
        ...state,
        errors: newErrors,
      };
    });
  }, []);
  const responsiveFormCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    width: responsiveSize("width"),
  });
  const isMountedRef = useRef(true);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (state.namesToValidate === null) {
      return;
    }

    setState((state) => {
      let newState = setPath(state, "errors", getNewErrors(state));

      if (state.submitStatus === "VALIDATE_THEN_SUBMIT") {
        newState = setPath(newState, "submitStatus", "SUBMIT");
      }

      return newState;
    });
  }, [state.namesToValidate, getNewErrors]);

  useEffect(() => {
    if (state.submitStatus === "SUBMIT") {
      onSubmit &&
        onSubmit({
          errors: state.errors,
          values: state.values,
          setErrors,
        });

      setState((state) => setPath(state, "submitStatus", "READY"));
    }
  }, [state.submitStatus, state.errors, state.values, onSubmit, setErrors]);

  return (
    <FormProvider value={providerValue}>
      <form
        css={responsiveFormCSS}
        method="POST"
        action="#" // https://stackoverflow.com/a/45705325/247243
        noValidate
        onSubmit={onFormSubmit}
        data-testid={testId}
      >
        {typeof children === "function"
          ? children({
              state: exposedState,
              validateField,
              submitForm,
              setValues,
            })
          : children}
      </form>
      {debug && <pre>{JSON.stringify(exposedState, null, 2)}</pre>}
    </FormProvider>
  );
}

Form.propTypes = {
  ...responsiveWidthType,
  initialValues: PropTypes.object.isRequired,
  initialErrors: PropTypes.object,
  onSubmit: PropTypes.func,
  debug: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  testId: PropTypes.string,
};

export default Form;
