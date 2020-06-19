import React from "react";
import PropTypes from "prop-types";
import { useTheme, Text } from "basis";
import useResizable from "./useResizable";

function PlaygroundScreen({ name, width }) {
  const theme = useTheme();
  const {
    size: screenSize,
    sizeWhenResizing: screenSizeWhenResizing,
    Resizable: ResizableScreen,
    setSize: setScreenSize,
  } = useResizable({
    resizeRight: true,
    defaultWidth: width,
    defaultHeight: "100%",
    minWidth: 300,
  });
  const resizedTo =
    parseInt(screenSizeWhenResizing.width, 10) === width ? null : (
      <span
        css={{
          fontSize: theme.fontSizes[0],
          float: "right",
        }}
      >
        resized to {screenSizeWhenResizing.width}
        <button
          css={{
            marginLeft: theme.space[2],
            padding: `0 ${theme.space[2]}`,
            border: 0,
            backgroundColor: theme.getColor("grey.t10"),
            fontSize: "inherit",
            fontFamily: "inherit",
            fontWeight: "inherit",
            lineHeight: "inherit",
            ":hover": {
              backgroundColor: theme.getColor("grey.t16"),
            },
          }}
          type="button"
          onClick={() => {
            setScreenSize({ width });
          }}
        >
          Reset
        </button>
      </span>
    );

  return (
    <ResizableScreen size={screenSize}>
      <div
        css={{
          display: "flex",
          flexDirection: "column-reverse",
          ...screenSizeWhenResizing,
        }}
      >
        <Text color="grey.t75" margin="1 1 0">
          <strong>{name}</strong> – {width}px {resizedTo}
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
