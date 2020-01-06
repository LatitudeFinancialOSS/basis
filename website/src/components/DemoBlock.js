import React from "react";
import PropTypes from "prop-types";
import { rgba } from "polished";
import { designTokens } from "basis";

const DEMO_BLOCK_COLORS_MAP = {
  red: "#ffd4d2",
  green: "#c1dbcb",
  blue: "#bbd3ff"
};

function DemoBlock({
  color = "red",
  width = "auto",
  height = "100%",
  children
}) {
  const [colorName, colorOpacity = 1] = color.split("-");
  const backgroundColor = rgba(
    DEMO_BLOCK_COLORS_MAP[colorName] || DEMO_BLOCK_COLORS_MAP.red,
    parseFloat(colorOpacity)
  );

  return (
    <div
      css={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        width: width === "auto" ? "auto" : designTokens.sizes[width],
        height:
          typeof height === "string" ? height : designTokens.sizes[height],
        minHeight: designTokens.sizes[10],
        overflow: "hidden",
        backgroundColor
      }}
    >
      {children}
    </div>
  );
}

DemoBlock.propTypes = {
  color: PropTypes.string,
  width: PropTypes.number,
  height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  children: PropTypes.node
};

export default DemoBlock;
