import React, { useContext } from "react";

const FormContext = React.createContext();

export const FormProvider = FormContext.Provider;

function useForm() {
  return useContext(FormContext);
}

export default useForm;
