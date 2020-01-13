import React, { useContext } from "react";

const ContainerContext = React.createContext();

export const ContainerProvider = ContainerContext.Provider;

function useContainer() {
  const value = useContext(ContainerContext);
  const bg = value ? value.bg : null;
  const isDarkBackground = bg === "primary.blue.t100";
  const buttonColor = isDarkBackground ? "white" : "highlight.blue.t100";
  const textColor = isDarkBackground ? "white" : "black";
  const linkColor = isDarkBackground
    ? "secondary.turquoise.t60"
    : "primary.blue.t100";
  const inputColor = !value || bg === "white" ? "grey.t05" : "white";

  return {
    bg,
    buttonColor,
    textColor,
    linkColor,
    inputColor
  };
}

export default useContainer;
