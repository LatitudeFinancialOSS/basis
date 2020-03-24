import React, { useContext } from "react";

const AccordionItemContext = React.createContext();

export const AccordionItemProvider = AccordionItemContext.Provider;

function useAccordionItem() {
  const accordionItemInfo = useContext(AccordionItemContext);
  const {
    headerId,
    contentId,
    isOpen,
    toggleAccordionItem,
  } = accordionItemInfo ?? {
    headerId: null,
    contentId: null,
    isOpen: false,
    toggleAccordionItem: () => {},
  };

  return {
    headerId,
    contentId,
    isOpen,
    toggleAccordionItem,
  };
}

export default useAccordionItem;
