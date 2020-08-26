import React from "react";
import PropTypes from "prop-types";
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
  responsiveMargin,
  responsivePadding,
  responsiveSize,
  responsiveTextAlign,
  responsiveOverflow,
  responsiveHasBreakpointWidth,
} from "../utils/css";
import {
  getResponsivePropMap,
  mergeResponsivePropMaps,
} from "../utils/component";
import { TEXT_STYLES, TEXT_ALIGNS } from "../utils/constants";

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
    hasBreakpointWidth: responsiveHasBreakpointWidth,
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
      if (flexGrow) {
        return {
          flexGrow: 1,
        };
      }

      return {};
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
        ...(boxShadow === "header" && {
          "::after": {
            content: "''",
            display: "block",
            height: theme.borderWidths[1],
            boxShadow: theme.shadows.header,
          },
        }),
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
  ...responsivePropType("textStyle", PropTypes.oneOf(TEXT_STYLES)),
  ...responsivePropType("textAlign", PropTypes.oneOf(TEXT_ALIGNS)),
  ...responsivePropType("overflow", PropTypes.string),
  ...responsivePropType("hasBreakpointWidth", PropTypes.bool),
  ...responsivePropType("hide", PropTypes.bool),
  children: PropTypes.node,
  testId: PropTypes.string,
};

export default Container;
