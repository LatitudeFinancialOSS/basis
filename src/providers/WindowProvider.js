import React from "react";
import PropTypes from "prop-types";

export const WindowContext = React.createContext();

function WindowProvider({ window, children }) {
  return (
    <WindowContext.Provider value={window}>{children}</WindowContext.Provider>
  );
}

WindowProvider.propTypes = {
  window: PropTypes.object,
  children: PropTypes.node.isRequired,
};

export default WindowProvider;
