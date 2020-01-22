import React from "react";
import PropTypes from "prop-types";
import useTheme from "../hooks/useTheme";
import { ContainerProvider } from "../hooks/useContainer";
import {
  responsiveMarginType,
  responsivePaddingType,
  responsiveWidthType,
  responsiveHeightType,
  responsivePropType
} from "../hooks/useResponsiveProp";
import useResponsivePropsCSS from "../hooks/useResponsivePropsCSS";
import {
  responsiveMargin,
  responsivePadding,
  responsiveWidth,
  responsiveHeight,
  responsiveTextAlign,
  mergeResponsiveCSS
} from "../utils/css";
import { ALIGNS as TEXT_ALIGNS } from "./Text";
import tokens from "../themes/tokens";

export const BACKGROUNDS = [
  "white",
  "grey.t03",
  "grey.t05",
  "secondary.lightBlue.t30",
  "primary.blue.t100"
];

export const BOX_SHADOWS = ["header"];

export const DEFAULT_PROPS = {
  hasBreakpointWidth: false
};

function Container(_props) {
  const props = { ...DEFAULT_PROPS, ..._props };
  const { bg, boxShadow, hasBreakpointWidth, children } = props;
  const theme = useTheme();
  const responsivePropsCSS = useResponsivePropsCSS(props, DEFAULT_PROPS, {
    margin: responsiveMargin,
    padding: responsivePadding,
    width: responsiveWidth,
    height: responsiveHeight,
    textAlign: responsiveTextAlign
  });
  const responsiveCSS = hasBreakpointWidth
    ? mergeResponsiveCSS(
        {
          marginLeft: "15px", // This is half of our special 30px columns gutter.
          marginRight: "15px",
          // Note: the order of these media queries is important (because they are not exclusive).
          [theme.minMediaQueries.sm]: {
            maxWidth: theme.breakpointMaxWidths.sm,
            marginLeft: "auto",
            marginRight: "auto"
          },
          [theme.minMediaQueries.md]: {
            maxWidth: theme.breakpointMaxWidths.md
          },
          [theme.minMediaQueries.lg]: {
            maxWidth: theme.breakpointMaxWidths.lg
          },
          [theme.minMediaQueries.xl]: {
            maxWidth: theme.breakpointMaxWidths.xl
          }
        },
        responsivePropsCSS
      )
    : responsivePropsCSS;
  const boxShadowCSS =
    boxShadow === "header"
      ? {
          "::after": {
            content: "''",
            display: "block",
            height: tokens.borderWidths[1],
            boxShadow: tokens.shadows.header
          }
        }
      : {
          boxShadow: tokens.shadows[boxShadow] || null
        };

  return (
    <ContainerProvider value={{ bg }}>
      <div
        css={{
          boxSizing: "border-box",
          backgroundColor: theme.getColor(bg),
          ...responsiveCSS,
          ...boxShadowCSS
        }}
      >
        {children}
      </div>
    </ContainerProvider>
  );
}

Container.propTypes = {
  bg: PropTypes.oneOf(BACKGROUNDS),
  boxShadow: PropTypes.oneOf(BOX_SHADOWS),
  ...responsiveMarginType,
  ...responsivePaddingType,
  ...responsiveWidthType,
  ...responsiveHeightType,
  ...responsivePropType("textAlign", PropTypes.oneOf(TEXT_ALIGNS)),
  hasBreakpointWidth: PropTypes.bool,
  children: PropTypes.node
};

export default Container;
