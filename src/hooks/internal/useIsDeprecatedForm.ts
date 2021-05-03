import { useContext } from "react";
import { FormContext } from "./useForm";

function useIsDeprecatedForm() {
  const context = useContext(FormContext);

  return !!context;
}

export default useIsDeprecatedForm;
