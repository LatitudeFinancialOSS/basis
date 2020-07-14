import React, { useRef } from "react";
import PropTypes from "prop-types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Resizable } from "re-resizable";
import { Text } from "basis";
import ComponentPreview from "../ComponentPreview";
import { screensState, componentPreviewCounterState } from "./recoilState";
import { MIN_SCREEN_WIDTH, MAX_SCREEN_WIDTH, updateItemWithId } from "./utils";

function PlaygroundScreen({ id, name, width }) {
  const componentPreviewCounter = useRecoilValue(componentPreviewCounterState);
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
      minWidth={MIN_SCREEN_WIDTH}
      maxWidth={MAX_SCREEN_WIDTH}
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
          overflowY: "hidden",
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
          <ComponentPreview
            iframeTitle={`${name} screen preview`}
            hasBodyMargin={false}
            key={
              componentPreviewCounter /* See: https://github.com/ryanseddon/react-frame-component/issues/170 */
            }
          />
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
