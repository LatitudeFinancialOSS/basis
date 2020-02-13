import React, { forwardRef, useMemo, useRef, useImperativeHandle } from "react";
import PropTypes from "prop-types";
import { FormProvider } from "../hooks/useForm";

function Form({ onSubmit, testId, children }, ref) {
  const validateFunctions = useRef([]);
  const providerValue = useMemo(
    () => ({
      registerValidation: validate => {
        if (!validateFunctions.current.includes(validate)) {
          validateFunctions.current.push(validate);
        }
      },
      unregisterValidation: validate => {
        const index = validateFunctions.current.findIndex(
          fn => fn === validate
        );

        if (index > -1) {
          validateFunctions.current.splice(index, 1);
        }
      }
    }),
    []
  );

  useImperativeHandle(ref, () => ({
    validateForm: () => {
      let errorsCount = 0;

      validateFunctions.current.forEach(validate => {
        errorsCount += validate();
      });

      return errorsCount;
    }
  }));

  return (
    <FormProvider value={providerValue}>
      <form method="POST" onSubmit={onSubmit} data-testid={testId}>
        {children}
      </form>
    </FormProvider>
  );
}

Form = forwardRef(Form); // eslint-disable-line no-func-assign

Form.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  testId: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default Form;
