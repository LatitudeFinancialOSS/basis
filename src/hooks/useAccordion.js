import React, { useContext } from "react";

const AccordionContext = React.createContext();

export const AccordionProvider = AccordionContext.Provider;

function useAccordion() {
  const accordionInfo = useContext(AccordionContext);
  const { color, textColor, itemHeaderAs, itemGap } = accordionInfo ?? {
    color: "grey.t07",
    textColor: "black",
    itemHeaderAs: "h3",
    itemGap: "large"
  };

  return {
    color,
    textColor,
    itemHeaderAs,
    itemGap
  };
}

export default useAccordion;
