import React, { useContext } from "react";

const TextStyleContext = React.createContext();

export const TextStyleProvider = TextStyleContext.Provider;

function useTextStyle() {
  const textStyle = useContext(TextStyleContext);

  return {
    textStyle,
  };
}

export default useTextStyle;
