import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Form } from "basis";

function FormContent({ onMount, children }) {
  useEffect(() => {
    onMount && onMount();
  }, [onMount]);

  return children;
}

FormContent.propTypes = {
  onMount: PropTypes.func,
  children: PropTypes.node.isRequired,
};

function KitchenSinkForm({ initialValues, submitOnMount, children }) {
  return (
    <Form initialValues={initialValues}>
      {({ submitForm }) => (
        <FormContent onMount={submitOnMount ? submitForm : null}>
          {children}
        </FormContent>
      )}
    </Form>
  );
}

KitchenSinkForm.propTypes = {
  initialValues: PropTypes.object.isRequired,
  submitOnMount: PropTypes.bool,
  children: PropTypes.node.isRequired,
};

export default KitchenSinkForm;
