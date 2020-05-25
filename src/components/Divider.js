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
      height="24"
      focusable="false"
      role="img"
      data-testid={testId}
    >
      <pattern
        id={patternId}
        x="0"
        y="0"
        width="15"
        height="24"
        patternUnits="userSpaceOnUse"
      >
        <circle cx="3" cy="3" r="3" fill={circleColor}></circle>
        <circle cx="10.5" cy="12" r="3" fill={circleColor}></circle>
        <circle cx="3" cy="21" r="3" fill={circleColor}></circle>
      </pattern>
      <rect
        css={{
          transform: "translateX(-4px)",
          width: "calc(100% + 4px)",
          height: "100%",
        }}
        x="0"
        y="0"
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
