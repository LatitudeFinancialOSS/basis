import { useState, useEffect } from "react";
import PropTypes from "prop-types";

function Canary({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("basisCanary") === "true") {
      setIsVisible(true);
    }
  }, []);

  return isVisible ? children : null;
}

Canary.propTypes = {
  children: PropTypes.node.isRequired
};

export default Canary;
