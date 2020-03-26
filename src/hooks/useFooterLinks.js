import React, { useContext } from "react";

const FooterLinksContext = React.createContext();

export const FooterLinksProvider = FooterLinksContext.Provider;

function useFooterLinks() {
  return useContext(FooterLinksContext);
}

export default useFooterLinks;
