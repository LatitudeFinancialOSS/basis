import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useSetRecoilState } from "recoil";
import { Resizable } from "re-resizable";
import { Text } from "basis";
import { screensState } from "./index";
import { updateItemWithId } from "./utils";

function PlaygroundScreen({ id, name, width }) {
  const setScreens = useSetRecoilState(screensState);
  const setScreenWidth = (width) => {
    setScreens((screens) => updateItemWithId(screens, id, { width }));
  };
  const widthOnResizeStart = useRef();

  return (
    <Resizable
      size={{ width }}
      onResizeStart={() => {
        widthOnResizeStart.current = width;
      }}
      onResize={(e, direction, ref, d) => {
        setScreenWidth(widthOnResizeStart.current + d.width);
      }}
      minWidth={300}
      enable={{
        top: false,
        right: true,
        bottom: false,
        left: false,
        topRight: false,
        bottomRight: false,
        bottomLeft: false,
        topLeft: false,
      }}
    >
      <div
        css={{
          display: "flex",
          flexDirection: "column-reverse",
          width,
          height: "100%",
        }}
      >
        <Text color="grey.t75" margin="1 1 0">
          <strong>{name}</strong> – {width}px
          {/* {parseInt(screenSizeWhenResizing.width, 10) !== width && (
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
          )} */}
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
    </Resizable>
  );
}

PlaygroundScreen.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
};

export default React.memo(PlaygroundScreen);
