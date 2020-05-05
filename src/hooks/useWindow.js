import { useContext } from "react";
import { WindowContext } from "../providers/WindowProvider";

function useWindow() {
  const windowFromContext = useContext(WindowContext);

  return windowFromContext ?? window;
}

export default useWindow;
