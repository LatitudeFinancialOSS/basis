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
  responsiveOverflow,
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

const borderColorMap = {
  transparent: "grey.t16",
  white: "grey.t16",
  "grey.t03": "grey.t10",
  "grey.t05": "grey.t16",
  "grey.t07": "grey.t16",
  "secondary.lightBlue.t15": "secondary.lightBlue.t60",
  "secondary.lightBlue.t25": "secondary.lightBlue.t80",
  "primary.blue.t100": "white",
};

const BOX_SHADOWS = ["header"];

const DEFAULT_PROPS = {
  bg: "transparent",
  flexGrow: false,
  hasBorder: false,
  hasBreakpointWidth: false,
  hide: false,
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
    overflow: responsiveOverflow,
    bg: ({ hasBorder }, theme, bp) => {
      const bg =
        mergedResponsiveBgMap[bp] === "transparent"
          ? "transparent"
          : mergedResponsiveBgMap[bp];
      const borderColor = hasBorder ? borderColorMap[bg] : null;

      return {
        backgroundColor:
          bg === "transparent" ? "transparent" : theme.getColor(bg),
        ...(borderColor && {
          border: `${theme.borderWidths[0]} solid ${theme.getColor(
            borderColor
          )}`,
        }),
      };
    },
    flexGrow: ({ flexGrow }) => {
      return {
        flexGrow: flexGrow ? 1 : 0,
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
    hide: ({ hide }) => {
      return hide
        ? {
            display: "none",
          }
        : {};
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
  ...responsivePropType("flexGrow", PropTypes.bool),
  ...responsivePropType("hasBorder", PropTypes.bool),
  ...responsivePropType("textStyle", PropTypes.oneOf(Text.TEXT_STYLES)),
  ...responsivePropType("textAlign", PropTypes.oneOf(Text.ALIGNS)),
  ...responsivePropType("overflow", PropTypes.string),
  ...responsivePropType("hasBreakpointWidth", PropTypes.bool),
  ...responsivePropType("hide", PropTypes.bool),
  children: PropTypes.node,
  testId: PropTypes.string,
};

export default Container;
