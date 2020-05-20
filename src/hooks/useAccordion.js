import React, { useContext } from "react";

const AccordionContext = React.createContext();

export const AccordionProvider = AccordionContext.Provider;

function useAccordion() {
  const accordionInfo = useContext(AccordionContext);

  return accordionInfo;
}

export default useAccordion;
