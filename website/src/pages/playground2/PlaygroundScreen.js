import React from "react";
import PropTypes from "prop-types";
import { Text } from "basis";

function PlaygroundScreen({ name, width }) {
  return (
    <div
      css={{
        width,
        backgroundColor: "white",
        boxShadow:
          "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      }}
    >
      <Text>{name}</Text>
    </div>
  );
}

PlaygroundScreen.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default PlaygroundScreen;
