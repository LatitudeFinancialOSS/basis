import React, { useContext } from "react";

export const BreakpointContext = React.createContext();

function useBreakpoint() {
  const breakpoint = useContext(BreakpointContext);

  return breakpoint;
}

export default useBreakpoint;
