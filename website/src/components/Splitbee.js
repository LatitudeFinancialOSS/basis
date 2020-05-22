import { useEffect } from "react";

const SPLITBEE_SCRIPT_ID = "basis-splitbee";

function Splitbee() {
  useEffect(() => {
    if (window.location.host !== "basis.now.sh") {
      return;
    }

    const script = document.createElement("script");

    script.id = SPLITBEE_SCRIPT_ID;
    script.async = true;
    script.src = "https://cdn.splitbee.io/sb.js";

    document.body.appendChild(script);

    return () => {
      const script = document.getElementById(SPLITBEE_SCRIPT_ID);

      if (script !== null) {
        script.remove();
      }
    };
  }, []);

  return null;
}

export default Splitbee;
