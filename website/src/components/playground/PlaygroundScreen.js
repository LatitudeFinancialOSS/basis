import React, { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Resizable } from "re-resizable";
import useMousePosition from "@react-hook/mouse-position";
import { Text } from "basis";
import ComponentPreview from "../ComponentPreview";
import {
  screensState,
  componentPreviewCounterState,
  isInspectModeState,
} from "./recoilState";
import {
  MIN_SCREEN_WIDTH,
  MAX_SCREEN_WIDTH,
  updateItemWithId,
  getComponentsAtPoint,
} from "./utils";

function PlaygroundScreen({ id, name, width, document, componentsLocation }) {
  const componentPreviewCounter = useRecoilValue(componentPreviewCounterState);
  const setScreens = useSetRecoilState(screensState);
  const isInspectMode = useRecoilValue(isInspectModeState);
  const [componentsAtMouse, setComponentsAtMouse] = useState({});
  const setScreenWidth = (width) => {
    setScreens((screens) => updateItemWithId(screens, id, { width }));
  };
  const setScreenDocument = (document) => {
    setScreens((screens) => updateItemWithId(screens, id, { document }));
  };
  const [mousePosition, mouseMoveRef] = useMousePosition(
    0, // enterDelay
    0, // leaveDelay
    10 // fps
  );
  const lastMousePosition = useRef();
  const widthOnResizeStart = useRef();

  useEffect(() => {
    const { x, y } = mousePosition;

    if (
      x !== null &&
      y !== null &&
      (!lastMousePosition.current ||
        lastMousePosition.current.x !== x ||
        lastMousePosition.current.y !== y)
    ) {
      const { scrollX, scrollY } = document.defaultView;
      const componentsAtMouse = getComponentsAtPoint(
        {
          x: x - scrollX,
          y: y - scrollY,
        },
        componentsLocation
      );

      setComponentsAtMouse(componentsAtMouse);
    }

    lastMousePosition.current = mousePosition;
  }, [mousePosition, document, componentsLocation]);

  useEffect(() => {
    setComponentsAtMouse({});
  }, [isInspectMode]);

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
        <ComponentPreview
          iframeTitle={`${name} screen preview`}
          iframeStyle={{
            flexGrow: 1,
            backgroundColor: "white",
            boxShadow:
              "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          }}
          hasBodyMargin={false}
          setDocument={setScreenDocument}
          containerRef={isInspectMode ? mouseMoveRef : undefined}
          highlightedComponents={componentsAtMouse}
          onMouseLeave={() => {
            setComponentsAtMouse({});
          }}
          key={
            componentPreviewCounter /* See: https://github.com/ryanseddon/react-frame-component/issues/170 */
          }
        />
      </div>
    </Resizable>
  );
}

PlaygroundScreen.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired,
  document: PropTypes.object,
  componentsLocation: PropTypes.object,
};

export default React.memo(PlaygroundScreen);
