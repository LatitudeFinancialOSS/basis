import React from "react";
import PropTypes from "prop-types";
import Text from "./Text";
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
import { EXCEPTION_PREFIX } from "../utils/css";
import tokens from "../themes/tokens";

const BACKGROUNDS = [
  "white",
  "grey.t03",
  "grey.t05",
  "secondary.lightBlue.t30",
  "primary.blue.t100"
];

const BOX_SHADOWS = ["header"];

const DEFAULT_PROPS = {
  hasBreakpointWidth: false
};

Container.BACKGROUNDS = BACKGROUNDS;
Container.BOX_SHADOWS = BOX_SHADOWS;
Container.DEFAULT_PROPS = DEFAULT_PROPS;

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
  bg: props => {
    if (!props.bg || BACKGROUNDS.includes(props.bg)) {
      return;
    }

    if (typeof props.bg === "string" && props.bg.startsWith(EXCEPTION_PREFIX)) {
      return;
    }

    return new Error(
      `Container: bg="${
        props.bg
      }" is not allowed. Must be one of: ${JSON.stringify(BACKGROUNDS)}`
    );
  },
  boxShadow: PropTypes.oneOf(BOX_SHADOWS),
  ...responsiveMarginType,
  ...responsivePaddingType,
  ...responsiveWidthType,
  ...responsiveHeightType,
  ...responsivePropType("textAlign", PropTypes.oneOf(Text.ALIGNS)),
  hasBreakpointWidth: PropTypes.bool,
  children: PropTypes.node
};

export default Container;
