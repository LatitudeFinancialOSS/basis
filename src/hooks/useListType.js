import React, { useContext } from "react";

const ListTypeContext = React.createContext();

export const ListTypeProvider = ListTypeContext.Provider;

function useListType() {
  const listInfo = useContext(ListTypeContext);
  const { type } = listInfo ?? { type: null };

  return {
    type
  };
}

export default useListType;
