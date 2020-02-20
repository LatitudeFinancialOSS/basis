import React, { useState, useEffect, useCallback, useRef } from "react";
import PropTypes from "prop-types";
import { FormProvider } from "../hooks/internal/useForm";
import { setPath } from "../utils/setPath";

const DEFAULT_PROPS = {
  fullWidth: true,
  debug: false
};

function getParentFieldName(name) {
  return name.split(".")[0];
}

Form.DEFAULT_PROPS = DEFAULT_PROPS;

function Form(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { initialValues, onSubmit, fullWidth, debug, children, testId } = props;
  const [state, setState] = useState({
    values: initialValues,
    errors: {},
    shouldValidateOnChange: false,
    namesToValidate: null,
    submitStatus: "READY"
  });
  const fields = useRef({});
  const lastFocusedFieldName = useRef(null);
  const lastMouseDownInputElement = useRef(null);
  const onFocus = event => {
    const { name } = event.target;
    const parentName = getParentFieldName(name);

    lastFocusedFieldName.current = parentName;

    setState(state =>
      setPath(
        state,
        "shouldValidateOnChange",
        Array.isArray(state.errors[parentName])
      )
    );
  };
  const onBlur = event => {
    const { target } = event;
    const { name } = target;
    const parentName = getParentFieldName(name);

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
        parentName !== lastFocusedFieldName.current &&
        (lastMouseDownInputElement.current === null ||
          parentName !==
            getParentFieldName(lastMouseDownInputElement.current.name))
      ) {
        setState(state => setPath(state, "namesToValidate", [parentName]));
      }
    });
  };
  const onChange = event => {
    const { target } = event;
    const { name } = target;
    const isCheckbox = target.type === "checkbox";
    const value = isCheckbox ? target.checked : target.value;

    setState(state => {
      let newState = setPath(state, `values.${name}`, value);

      /*
        Without validating the Checkbox on every change, we have the following unwanted behaviour.
        When the Checkbox is not checked:
          1. Click the Checkbox twice (it should be unchecked again).
          2. Press the Checkbox without releasing it (validation error appears).
          3. If you resease the Checkbox now, the validation error disappears.
      */
      if (state.shouldValidateOnChange || isCheckbox) {
        newState = setPath(newState, "namesToValidate", [
          getParentFieldName(name)
        ]);
      }

      return newState;
    });
  };
  const onMouseDown = event => {
    const { target } = event;
    const document = target.ownerDocument;
    const inputElement = document.querySelector(`#${target.htmlFor}`);

    lastMouseDownInputElement.current = inputElement;
  };
  const registerField = (name, field) => {
    fields.current[name] = field;
  };
  const unregisterField = name => {
    delete fields.current[name];
  };
  const providerValue = {
    state,
    onFocus, // should be called by inputs
    onBlur, // should be called by inputs
    onChange, // should be called by inputs
    onMouseDown, // should be called by input labels that have a "for" attribute
    registerField,
    unregisterField
  };
  const validateField = useCallback((state, name) => {
    const value = state.values[name];
    const field = fields.current[name];

    if (
      field.optional === true &&
      typeof field.data?.isEmpty === "function" &&
      field.data.isEmpty(value) === true
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
    state => {
      const names = state.namesToValidate;
      const newErrors = { ...state.errors };

      names.forEach(name => {
        const errors = validateField(state, name);

        if (errors === null) {
          delete newErrors[name];
        } else {
          newErrors[name] = errors;
        }
      });

      return newErrors;
    },
    [validateField]
  );
  const submitForm = useCallback(() => {
    setState(state => ({
      ...state,
      namesToValidate: Object.keys(state.values),
      submitStatus: "VALIDATE_THEN_SUBMIT"
    }));
  }, []);
  const onFormSubmit = useCallback(
    event => {
      event.preventDefault();
      submitForm();
    },
    [submitForm]
  );

  useEffect(() => {
    if (state.namesToValidate === null) {
      return;
    }

    setState(state => {
      let newState = setPath(state, "errors", getNewErrors(state));

      if (state.submitStatus === "VALIDATE_THEN_SUBMIT") {
        newState = setPath(newState, "submitStatus", "SUBMIT");
      }

      return newState;
    });
  }, [state.namesToValidate, getNewErrors]);

  useEffect(() => {
    if (state.submitStatus === "SUBMIT") {
      onSubmit?.(state.errors, state.values);

      setState(state => setPath(state, "submitStatus", "READY"));
    }
  }, [state.submitStatus, state.errors, state.values, onSubmit]);

  return (
    <FormProvider value={providerValue}>
      <form
        css={{
          ...(fullWidth === true ? { width: "100%" } : {})
        }}
        method="POST"
        action="#" // https://stackoverflow.com/a/45705325/247243
        onSubmit={onFormSubmit}
        data-testid={testId}
      >
        {typeof children === "function"
          ? children({ state, submitForm })
          : children}
      </form>
      {debug && <pre>{JSON.stringify(state, null, 2)}</pre>}
    </FormProvider>
  );
}

Form.propTypes = {
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func,
  fullWidth: PropTypes.bool,
  debug: PropTypes.bool,
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  testId: PropTypes.string
};

export default Form;
