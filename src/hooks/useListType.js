import React, { useContext } from "react";

const ListTypeContext = React.createContext();

export const ListTypeProvider = ListTypeContext.Provider;

function useListType() {
  const listType = useContext(ListTypeContext);

  return {
    listType
  };
}

export default useListType;
