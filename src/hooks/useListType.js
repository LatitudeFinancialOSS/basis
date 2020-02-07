import React, { useContext } from "react";

const ListTypeContext = React.createContext();

export const ListTypeProvider = ListTypeContext.Provider;

function useListType() {
  const listInfo = useContext(ListTypeContext);
  const { type, level } = listInfo ?? { type: null, level: -1 };

  return {
    type,
    level
  };
}

export default useListType;
