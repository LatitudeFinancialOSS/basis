import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
import useTheme from "../hooks/useTheme";
import { TextStyleProvider } from "../hooks/useTextStyle";
import useBackground, { BackgroundProvider } from "../hooks/useBackground";
import {
  responsiveMarginType,
  responsivePaddingType,
  responsiveWidthType,
  responsiveHeightType,
  responsivePropType,
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  DEFAULT_BREAKPOINT,
  responsiveMargin,
  responsivePadding,
  responsiveSize,
  responsiveTextAlign,
} from "../utils/css";
import {
  getResponsivePropMap,
  mergeResponsivePropMaps,
} from "../utils/component";

const BACKGROUNDS = [
  "transparent",
  "white",
  "grey.t03",
  "grey.t05",
  "grey.t07",
  "secondary.lightBlue.t15",
  "secondary.lightBlue.t25",
  "primary.blue.t100",
];

const BOX_SHADOWS = ["header"];

const DEFAULT_PROPS = {
  bg: "transparent",
  hasBreakpointWidth: false,
};

Container.BACKGROUNDS = BACKGROUNDS;
Container.BOX_SHADOWS = BOX_SHADOWS;
Container.DEFAULT_PROPS = DEFAULT_PROPS;

function Container(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { boxShadow, textStyle, children, testId } = props;
  const theme = useTheme();
  const { bgMap: inheritedBgMap } = useBackground();
  const myBgMap = getResponsivePropMap(_props, DEFAULT_PROPS, "bg", theme);
  const mergedResponsiveBgMap = mergeResponsivePropMaps(
    inheritedBgMap,
    myBgMap,
    theme
  );
  const responsiveCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    padding: responsivePadding,
    width: responsiveSize("width"),
    height: responsiveSize("height"),
    textAlign: responsiveTextAlign,
    bg: (propsAtBreakpoint, theme, bp) => {
      return {
        backgroundColor:
          mergedResponsiveBgMap[bp] === "transparent"
            ? "transparent"
            : theme.getColor(mergedResponsiveBgMap[bp]),
      };
    },
    hasBreakpointWidth: ({ hasBreakpointWidth, margin }, theme, bp) => {
      if (hasBreakpointWidth !== true) {
        if (margin) {
          return {
            maxWidth: "initial",
          };
        }

        return {
          maxWidth: "initial",
          marginLeft: "initial",
          marginRight: "initial",
        };
      }

      if (bp === DEFAULT_BREAKPOINT || !theme.breakpointMaxWidths[bp]) {
        return {
          marginLeft: "15px", // This is half of our special 30px columns gap.
          marginRight: "15px",
        };
      }

      return {
        maxWidth: theme.breakpointMaxWidths[bp],
        marginLeft: "auto",
        marginRight: "auto",
      };
    },
  });
  let container = (
    <div
      css={{
        boxSizing: "border-box",
        ...responsiveCSS,
        ...theme[`container.${boxShadow}`],
        "::after": theme[`container.${boxShadow}::after`],
      }}
      data-testid={testId}
    >
      {children}
    </div>
  );

  if (textStyle) {
    container = (
      <TextStyleProvider value={textStyle}>{container}</TextStyleProvider>
    );
  }

  return (
    <BackgroundProvider value={mergedResponsiveBgMap}>
      {container}
    </BackgroundProvider>
  );
}

Container.propTypes = {
  boxShadow: PropTypes.oneOf(BOX_SHADOWS),
  ...responsiveMarginType,
  ...responsivePaddingType,
  ...responsiveWidthType,
  ...responsiveHeightType,
  ...responsivePropType("bg", PropTypes.oneOf(BACKGROUNDS)),
  ...responsivePropType("textStyle", PropTypes.oneOf(Text.TEXT_STYLES)),
  ...responsivePropType("textAlign", PropTypes.oneOf(Text.ALIGNS)),
  ...responsivePropType("hasBreakpointWidth", PropTypes.bool),
  children: PropTypes.node,
  testId: PropTypes.string,
};

export default Container;
