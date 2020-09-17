import React, { useState, useMemo } from "react";
import PropTypes from "prop-types";
import { Resizable } from "re-resizable";
import { LiveProvider, LiveError } from "react-live";
import { useTheme } from "basis";
import { reactLiveEditorTheme } from "../utils/constants";
import ComponentCode from "./ComponentCode";
import ComponentPreview from "./ComponentPreview";

const rightOnly = {
  top: false,
  right: true,
  bottom: false,
  left: false,
  topRight: false,
  bottomRight: false,
  bottomLeft: false,
  topLeft: false,
};

function ComponentContainer(props) {
  const { code, noInline = false, scope, hasBodyMargin, bg } = props;
  const theme = useTheme();
  const spaceBetween = parseInt(theme.space[11], 10);
  const spaceAroundIframe = parseInt(theme.space[5], 10);
  const borderWidthPx = theme.borderWidths[0];
  const borderWidth = parseInt(borderWidthPx, 10);
  const minWidth = 50 + 2 * spaceAroundIframe + borderWidth;
  const initialWidth = useMemo(() => {
    if (!props.width || typeof props.width === "string") {
      const initialWidthPx =
        theme.breakpoints[props.width || "xs"] || props.width;

      return parseInt(initialWidthPx, 10) + 2 * spaceAroundIframe;
    }

    return props.width + 2 * spaceAroundIframe;
  }, [props.width, theme.breakpoints, spaceAroundIframe]);
  const [resizeWidth, setResizeWidth] = useState(
    initialWidth - 2 * spaceAroundIframe
  );
  const [width, setWidth] = useState(initialWidth + borderWidth);

  return (
    <div css={{ display: "flex", flexGrow: 1, overflowY: "auto" }}>
      <LiveProvider
        code={code}
        scope={scope}
        noInline={noInline}
        theme={reactLiveEditorTheme}
      >
        <div>
          <Resizable
            style={{
              flexShrink: 0,
              marginRight: spaceBetween,
              borderRight: `${borderWidthPx} solid ${theme.colors.grey.t10}`,
            }}
            enable={rightOnly}
            minWidth={minWidth}
            size={{
              width,
              height: "100%",
            }}
            onResizeStop={(_e, _direction, _ref, d) => {
              setWidth(width + d.width);
            }}
            onResize={(_e, _direction, _ref, d) => {
              setResizeWidth(
                width + d.width - 2 * spaceAroundIframe - borderWidth
              );
            }}
          >
            <div
              css={{
                position: "absolute",
                right: 0,
                top: 0,
                backgroundColor: theme.colors.grey.t10,
                fontSize: theme.fontSizes[0],
                padding: `0 ${theme.space[1]}`,
              }}
            >
              {resizeWidth}px
            </div>
            <div
              css={{
                height: "100%",
                boxSizing: "border-box",
                padding: spaceAroundIframe,
                backgroundColor: theme.getColor(bg),
                overflowY: "auto",
              }}
            >
              <ComponentPreview hasBodyMargin={hasBodyMargin} bg={bg} />
            </div>
          </Resizable>
        </div>
        <div css={{ flexGrow: 1, overflowY: "auto" }}>
          <ComponentCode code={code} />
          <LiveError />
        </div>
      </LiveProvider>
    </div>
  );
}

ComponentContainer.propTypes = {
  code: PropTypes.string.isRequired,
  noInline: PropTypes.bool,
  scope: PropTypes.object.isRequired,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  hasBodyMargin: PropTypes.bool,
  bg: PropTypes.string,
};

export default ComponentContainer;
