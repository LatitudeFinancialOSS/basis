import React, { useState } from "react";
import PropTypes from "prop-types";
import { nanoid } from "nanoid";
import useTheme from "../hooks/useTheme";
import { responsiveMarginType } from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import { responsiveMargin } from "../utils/css";

const COLORS = ["grey.t07"];
const DEFAULT_PROPS = {
  color: "grey.t07",
};

Divider.DEFAULT_PROPS = DEFAULT_PROPS;

function Divider(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { color, testId } = props;
  const [patternId] = useState(() => `divider-${nanoid()}`);
  const theme = useTheme();
  const circleColor = theme.getColor(color);
  const responsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
  });

  return (
    <svg
      css={responsiveCSS}
      width="100%"
      height="32"
      focusable="false"
      role="img"
      data-testid={testId}
    >
      <pattern
        id={patternId}
        x="0"
        y="0"
        width="20"
        height="32"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="4" cy="4" r="4" fill={circleColor}></circle>
        <circle cx="14" cy="16" r="4" fill={circleColor}></circle>
        <circle cx="4" cy="28" r="4" fill={circleColor}></circle>
      </pattern>
      <rect
        x="0"
        y="0"
        width="100%"
        height="100%"
        fill={`url(#${patternId})`}
      ></rect>
    </svg>
  );
}

Divider.propTypes = {
  ...responsiveMarginType,
  color: PropTypes.oneOf(COLORS),
  testId: PropTypes.string,
};

export default Divider;
