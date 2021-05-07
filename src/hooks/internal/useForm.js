import React, { useContext } from "react";

export const FormContext = React.createContext();

export const FormProvider = FormContext.Provider;

function useForm(componentName) {
  const context = useContext(FormContext);

  if (context) {
    return context;
  }

  throw new Error(`${componentName} must be placed inside a Form`);
}

export default useForm;
