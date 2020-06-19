import React from "react";
import PropTypes from "prop-types";
import { Text } from "basis";

function PlaygroundScreen({ name, width }) {
  return (
    <div
      css={{
        display: "flex",
        flexDirection: "column-reverse",
        height: "100%",
      }}
    >
      <Text color="grey.t75" margin="1 1 0">
        <strong>{name}</strong> – {width}px
      </Text>
      <div
        css={{
          flexGrow: 1,
          backgroundColor: "white",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
        }}
      >
        iframe
      </div>
    </div>
  );
}

PlaygroundScreen.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default PlaygroundScreen;
