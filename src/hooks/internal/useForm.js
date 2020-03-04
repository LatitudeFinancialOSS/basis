import React, { useContext } from "react";
import { ERROR_STRINGS } from "../../utils/error";

const FormContext = React.createContext();

export const FormProvider = FormContext.Provider;

function useForm() {
  const context = useContext(FormContext);
  if (context) {
    return context;
  } else {
    throw new Error(ERROR_STRINGS.FIELD.MISSING_FORM);
  }
}

export default useForm;
