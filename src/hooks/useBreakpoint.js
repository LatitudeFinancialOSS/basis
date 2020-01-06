import { useContext } from "react";
import { BreakpointContext } from "../providers/BreakpointProvider";

function useBreakpoint() {
  const breakpoint = useContext(BreakpointContext);

  return breakpoint;
}

export default useBreakpoint;
