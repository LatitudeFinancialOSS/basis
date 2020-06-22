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
    minWidth: 300,
  });

  return (
    <ResizableScreen size={screenSize}>
      <div
        css={{
          display: "flex",
          flexDirection: "column-reverse",
          width: screenSizeWhenResizing.width,
          height: "100%",
        }}
      >
        <Text color="grey.t75" margin="1 1 0">
          <strong>{name}</strong> – {screenSizeWhenResizing.width}
          {parseInt(screenSizeWhenResizing.width, 10) !== width && (
            <button
              css={{
                float: "right",
                padding: `0 ${theme.space[2]}`,
                border: 0,
                backgroundColor: theme.getColor("grey.t10"),
                borderRadius: theme.radii[1],
                fontSize: theme.fontSizes[0],
                fontFamily: "inherit",
                fontWeight: "inherit",
                lineHeight: "inherit",
                transition: "background-color 100ms ease, transform 100ms ease",
                ":hover": {
                  backgroundColor: theme.getColor("grey.t16"),
                },
                ":active": {
                  transform: "scale(0.95)",
                },
                ...theme.focusStyles.focusVisible,
              }}
              type="button"
              onClick={() => {
                setScreenSize({ width: width + "px" });
              }}
            >
              Reset
            </button>
          )}
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
