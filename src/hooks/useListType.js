import React, { useContext } from "react";

const ListTypeContext = React.createContext();

export const ListTypeProvider = ListTypeContext.Provider;

function useListType() {
  const listInfo = useContext(ListTypeContext);
  const { type, variant } = listInfo ?? {
    type: null,
    variant: null,
  };

  return {
    type,
    variant,
  };
}

export default useListType;
