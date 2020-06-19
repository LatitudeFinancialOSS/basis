import React from "react";
import PropTypes from "prop-types";
import { Text } from "basis";
import useResizable from "./useResizable";

function PlaygroundScreen({ name, width }) {
  const [screenSize, sizeWhenResizing, ResizableScreen] = useResizable({
    resizeRight: true,
    defaultWidth: width,
    defaultHeight: "100%",
    minWidth: 200,
  });

  return (
    <ResizableScreen size={screenSize}>
      <div
        css={{
          display: "flex",
          flexDirection: "column-reverse",
          ...sizeWhenResizing,
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
    </ResizableScreen>
  );
}

PlaygroundScreen.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default PlaygroundScreen;
