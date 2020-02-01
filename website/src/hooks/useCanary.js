import { useState, useEffect } from "react";

function useCanary() {
  const [isCanary, setIsCanary] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("basisCanary") === "true") {
      setIsCanary(true);
    }
  }, []);

  return isCanary;
}

export default useCanary;
