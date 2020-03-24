import React, { useContext } from "react";

const BackgroundContext = React.createContext();

export const BackgroundProvider = BackgroundContext.Provider;

function useBackground() {
  const background = useContext(BackgroundContext);
  const inputColor =
    !background || background === "white" ? "grey.t05" : "white";

  return {
    background,
    inputColor,
  };
}

export default useBackground;
